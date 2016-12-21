<?php

namespace SMW\Tests\SQLStore;

use SMW\SQLStore\DataItemByIdFinder;
use SMW\ApplicationFactory;

/**
 * @covers \SMW\SQLStore\DataItemByIdFinder
 *
 * @group semantic-mediawiki
 *
 * @license GNU GPL v2+
 * @since   2.1
 *
 * @author mwjames
 */
class DataItemByIdFinderTest extends \PHPUnit_Framework_TestCase {

	private $cache;

	protected function setUp() {
		parent::setUp();

		$this->cache = ApplicationFactory::getInstance()->newCacheFactory()->newFixedInMemoryCache();
	}

	public function testCanConstruct() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$this->assertInstanceOf(
			'\SMW\SQLStore\DataItemByIdFinder',
			new DataItemByIdFinder( $connection, 'foo' )
		);
	}

	public function testGetDataItemForNonCachedId() {

		$row = new \stdClass;
		$row->smw_title = 'Foo';
		$row->smw_namespace = 0;
		$row->smw_iw = '';
		$row->smw_subobject ='';

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->once() )
			->method( 'selectRow' )
			->with(
				$this->anything(),
				$this->anything(),
				$this->equalTo( array( 'smw_id' => 42 ) ) )
			->will( $this->returnValue( $row ) );

		$instance = new DataItemByIdFinder(
			$connection,
			'foo',
			$this->cache
		);

		$this->assertInstanceOf(
			'\SMW\DIWikiPage',
			$instance->getDataItemForId( 42 )
		);

		$stats = $this->cache->getStats();

		$this->assertEquals(
			1,
			$stats['count']
		);
	}

	public function testGetDataItemForCachedId() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->never() )
			->method( 'selectRow' );

		$this->cache->save( 42, 'Foo#0##' );

		$instance = new DataItemByIdFinder(
			$connection,
			'foo',
			$this->cache
		);

		$this->assertInstanceOf(
			'\SMW\DIWikiPage',
			$instance->getDataItemForId( 42 )
		);

		$stats = $this->cache->getStats();

		$this->assertEquals(
			0,
			$stats['misses']
		);

		$this->assertEquals(
			1,
			$stats['hits']
		);
	}

	public function testPredefinedPropertyItem() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->never() )
			->method( 'selectRow' );

		$instance = new DataItemByIdFinder(
			$connection,
			'foo',
			$this->cache
		);

		$instance->saveToCache( 42, '_MDAT#102##' );

		$this->assertInstanceOf(
			'\SMW\DIWikiPage',
			$instance->getDataItemForId( 42 )
		);
	}

	public function testSaveDeleteFromCaceh() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->once() )
			->method( 'selectRow' )
			->will( $this->returnValue( false ) );

		$instance = new DataItemByIdFinder(
			$connection,
			'foo',
			$this->cache
		);

		$instance->saveToCache( 42, 'Foo#14##' );
		$instance->getDataItemForId( 42 );

		$instance->deleteFromCache( 42 );
		$instance->getDataItemForId( 42 );
	}

	public function testClearCache() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->once() )
			->method( 'selectRow' )
			->will( $this->returnValue( false ) );

		$instance = new DataItemByIdFinder(
			$connection,
			'foo',
			$this->cache
		);

		$instance->saveToCache( 42, 'Foo#0##' );
		$instance->getDataItemForId( 42 );

		$instance->clear();
		$instance->getDataItemForId( 42 );
	}

	public function testNullForUnknownId() {

		$connection = $this->getMockBuilder( '\SMW\MediaWiki\Database' )
			->disableOriginalConstructor()
			->getMock();

		$connection->expects( $this->once() )
			->method( 'selectRow' )
			->will( $this->returnValue( false ) );

		$instance = new DataItemByIdFinder( $connection, 'foo' );

		$this->assertNull(
			$instance->getDataItemForId( 42 )
		);
	}

}
