<?php

namespace SMW\MediaWiki;

use Revision;
use Title;

/**
 * @license GNU GPL v2+
 * @since 2.2
 *
 * @author mwjames
 */
class MediaWikiNsContentReader {

	/**
	 * @var boolean
	 */
	private $useDatabaseForFallback = true;

	/**
	 * @since 2.2
	 *
	 * @param boolean $useDatabaseForFallback
	 */
	public function useDatabaseForFallback( $useDatabaseForFallback ) {
		$this->useDatabaseForFallback = (bool)$useDatabaseForFallback;
	}

	/**
	 * @since 2.2
	 *
	 * @param string $name
	 *
	 * @return string
	 */
	public function read( $name ) {

		$content = '';

		if ( wfMessage( $name )->exists() ) {
			$content = wfMessage( $name )->inContentLanguage()->text();
		}

		if ( $content === '' && $this->useDatabaseForFallback ) {
			$content = $this->tryLoadingFromDatabase( $name );
		}

		return $content;
	}

	private function tryLoadingFromDatabase( $name ) {

		$title = Title::makeTitleSafe( NS_MEDIAWIKI, ucfirst( $name ) );

		if ( $title === null ) {
			return '';
		}

		// Revision::READ_LATEST is not specified in MW 1.19
		$revisionReadFlag = defined( 'Revision::READ_LATEST' ) ? Revision::READ_LATEST : 0;

		$revision = Revision::newFromTitle( $title, false, $revisionReadFlag );

		if ( $revision === null ) {
			return '';
		}

		if ( class_exists( 'WikitextContent' ) ) {
			return $revision->getContent()->getNativeData();
		}

		return $revision->getRawText();
	}

}
