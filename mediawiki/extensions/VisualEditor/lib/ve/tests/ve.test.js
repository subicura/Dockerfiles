/*!
 * VisualEditor Base method tests.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see http://ve.mit-license.org
 */

QUnit.module( 've' );

/* Tests */

// ve.getProp: Tested upstream (OOjs)

// ve.setProp: Tested upstream (OOjs)

// ve.cloneObject: Tested upstream (OOjs)

// ve.getObjectValues: Tested upstream (OOjs)

// ve.compare: Tested upstream (OOjs)

// ve.copy: Tested upstream (OOjs)

// ve.isPlainObject: Tested upstream (jQuery)

// ve.isEmptyObject: Tested upstream (jQuery)

// ve.extendObject: Tested upstream (jQuery)

QUnit.test( 'compareClassLists', 1, function ( assert ) {
	var i, cases = [
		{
			args: ['', ''],
			expected: true
		},
		{
			args: ['', []],
			expected: true
		},
		{
			args: [[], []],
			expected: true
		},
		{
			args: ['', ['']],
			expected: true
		},
		{
			args: [[], ['']],
			expected: true
		},
		{
			args: ['foo', ''],
			expected: false
		},
		{
			args: ['foo', 'foo'],
			expected: true
		},
		{
			args: ['foo', 'bar'],
			expected: false
		},
		{
			args: ['foo', 'foo bar'],
			expected: false
		},
		{
			args: ['foo', ['foo']],
			expected: true
		},
		{
			args: [['foo'], 'bar'],
			expected: false
		},
		{
			args: ['foo', ['foo', 'bar']],
			expected: false
		},
		{
			args: ['foo', ['foo', 'foo']],
			expected: true
		},
		{
			args: [['foo'], 'foo foo'],
			expected: true
		},
		{
			args: ['foo bar foo', 'foo foo'],
			expected: false
		}
	];

	QUnit.expect( cases.length );
	for ( i = 0; i < cases.length; i++ ) {
		assert.strictEqual( ve.compareClassLists.apply( ve, cases[i].args ), cases[i].expected );
	}
} );

QUnit.test( 'isInstanceOfAny', 7, function ( assert ) {
	function Foo() {}
	OO.initClass( Foo );

	function Bar() {}
	OO.initClass( Bar );

	function SpecialFoo() {}
	OO.inheritClass( SpecialFoo, Foo );

	function VerySpecialFoo() {}
	OO.inheritClass( VerySpecialFoo, SpecialFoo );

	assert.strictEqual(
		ve.isInstanceOfAny( new Foo(), [ Foo ] ),
		true,
		'Foo is an instance of Foo'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new SpecialFoo(), [ Foo ] ),
		true,
		'SpecialFoo is an instance of Foo'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new SpecialFoo(), [ Bar ] ),
		false,
		'SpecialFoo is not an instance of Bar'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new SpecialFoo(), [ Bar, Foo ] ),
		true,
		'SpecialFoo is an instance of Bar or Foo'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new VerySpecialFoo(), [ Bar, Foo ] ),
		true,
		'VerySpecialFoo is an instance of Bar or Foo'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new VerySpecialFoo(), [ Foo, SpecialFoo ] ),
		true,
		'VerySpecialFoo is an instance of Foo or SpecialFoo'
	);

	assert.strictEqual(
		ve.isInstanceOfAny( new VerySpecialFoo(), [] ),
		false,
		'VerySpecialFoo is not an instance of nothing'
	);
} );

QUnit.test( 'getDomAttributes', 1, function ( assert ) {
	assert.deepEqual(
		ve.getDomAttributes( $.parseHTML( '<div string="foo" empty number="0"></div>' )[ 0 ] ),
		{ string: 'foo', empty: '', number: '0' },
		'getDomAttributes() returns object with correct attributes'
	);
} );

QUnit.test( 'setDomAttributes', 7, function ( assert ) {
	var target,
		sample = $.parseHTML( '<div foo="one" bar="two" baz="three"></div>' )[ 0 ];

	target = {};
	ve.setDomAttributes( target, { add: 'foo' } );
	assert.deepEqual( target, {}, 'ignore incompatible target object' );

	target = document.createElement( 'div' );
	ve.setDomAttributes( target, { string: 'foo', empty: '', number: 0 } );
	assert.deepEqual(
		ve.getDomAttributes( target ),
		{ string: 'foo', empty: '', number: '0' },
		'add attributes'
	);

	target = sample.cloneNode();
	ve.setDomAttributes( target, { foo: null, bar: 'update', baz: undefined, add: 'yay' } );
	assert.deepEqual(
		ve.getDomAttributes( target ),
		{ bar: 'update', add: 'yay' },
		'add, update, and remove attributes'
	);

	target = sample.cloneNode();
	ve.setDomAttributes( target, { onclick: 'alert(1);', foo: 'update', add: 'whee' }, ['foo', 'add'] );
	assert.ok( !target.hasAttribute( 'onclick' ), 'whitelist affects creating attributes' );
	assert.deepEqual(
		ve.getDomAttributes( target ),
		{ foo: 'update', bar: 'two', baz: 'three', add: 'whee' },
		'whitelist does not affect pre-existing attributes'
	);

	target = document.createElement( 'div' );
	ve.setDomAttributes( target, { Foo: 'add', Bar: 'add' }, ['bar'] );
	assert.deepEqual(
		ve.getDomAttributes( target ),
		{ bar: 'add' },
		'whitelist is case-insensitive'
	);

	target = sample.cloneNode();
	ve.setDomAttributes( target, { foo: 'update', bar: null }, ['bar', 'baz'] );
	assert.propEqual(
		ve.getDomAttributes( target ),
		{ foo: 'one', baz: 'three' },
		'whitelist affects removal/updating of attributes'
	);
} );

QUnit.test( 'getHtmlAttributes', 7, function ( assert ) {
	assert.deepEqual(
		ve.getHtmlAttributes(),
		'',
		'no attributes argument'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( NaN + 'px' ),
		'',
		'invalid attributes argument'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( {} ),
		'',
		'empty attributes argument'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( { src: 'foo' } ),
		'src="foo"',
		'one attribute'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( { href: 'foo', rel: 'bar' } ),
		'href="foo" rel="bar"',
		'two attributes'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( { selected: true, blah: false, value: 3 } ),
		'selected="selected" value="3"',
		'handling of booleans and numbers'
	);
	assert.deepEqual(
		ve.getHtmlAttributes( { placeholder: '<foo>&"bar"&\'baz\'' } ),
		'placeholder="&lt;foo&gt;&amp;&quot;bar&quot;&amp;&#039;baz&#039;"',
		'escaping of attribute values'
	);
} );

QUnit.test( 'getOpeningHtmlTag', 3, function ( assert ) {
	assert.deepEqual(
		ve.getOpeningHtmlTag( 'code', {} ),
		'<code>',
		'opening tag without attributes'
	);
	assert.deepEqual(
		ve.getOpeningHtmlTag( 'img', { src: 'foo' } ),
		'<img src="foo">',
		'opening tag with one attribute'
	);
	assert.deepEqual(
		ve.getOpeningHtmlTag( 'a', { href: 'foo', rel: 'bar' } ),
		'<a href="foo" rel="bar">',
		'tag with two attributes'
	);
} );

QUnit.test( 'batchSplice', 8, function ( assert ) {
	var actualRet, expectedRet, i,
		actual = [ 'a', 'b', 'c', 'd', 'e' ],
		expected = actual.slice( 0 ),
		bigArr = [];

	actualRet = ve.batchSplice( actual, 1, 1, [] );
	expectedRet = expected.splice( 1, 1 );
	assert.deepEqual( expectedRet, actualRet, 'removing 1 element (return value)' );
	assert.deepEqual( expected, actual, 'removing 1 element (array)' );

	actualRet = ve.batchSplice( actual, 3, 2, [ 'w', 'x', 'y', 'z' ] );
	expectedRet = expected.splice( 3, 2, 'w', 'x', 'y', 'z' );
	assert.deepEqual( expectedRet, actualRet, 'replacing 2 elements with 4 elements (return value)' );
	assert.deepEqual( expected, actual, 'replacing 2 elements with 4 elements (array)' );

	actualRet = ve.batchSplice( actual, 0, 0, [ 'f', 'o', 'o' ] );
	expectedRet = expected.splice( 0, 0, 'f', 'o', 'o' );
	assert.deepEqual( expectedRet, actualRet, 'inserting 3 elements (return value)' );
	assert.deepEqual( expected, actual, 'inserting 3 elements (array)' );

	for ( i = 0; i < 2100; i++ ) {
		bigArr[i] = i;
	}
	actualRet = ve.batchSplice( actual, 2, 3, bigArr );
	expectedRet = expected.splice.apply( expected, [2, 3].concat( bigArr.slice( 0, 1050 ) ) );
	expected.splice.apply( expected, [1052, 0].concat( bigArr.slice( 1050 ) ) );
	assert.deepEqual( expectedRet, actualRet, 'replacing 3 elements with 2100 elements (return value)' );
	assert.deepEqual( expected, actual, 'replacing 3 elements with 2100 elements (array)' );
} );

QUnit.test( 'insertIntoArray', 3, function ( assert ) {
	var target;

	target = [ 'a', 'b', 'c' ];
	ve.insertIntoArray( target, 0, [ 'x', 'y' ] );
	assert.deepEqual( target, [ 'x', 'y', 'a', 'b', 'c' ], 'insert at start' );

	target = [ 'a', 'b', 'c' ];
	ve.insertIntoArray( target, 2, [ 'x', 'y' ] );
	assert.deepEqual( target, [ 'a', 'b', 'x', 'y', 'c' ], 'insert into the middle' );

	target = [ 'a', 'b', 'c' ];
	ve.insertIntoArray( target, 10, [ 'x', 'y' ] );
	assert.deepEqual( target, [ 'a', 'b', 'c', 'x', 'y' ], 'insert beyond end' );
} );

QUnit.test( 'escapeHtml', 1, function ( assert ) {
	assert.strictEqual( ve.escapeHtml( ' "script\' <foo & bar> ' ), ' &quot;script&#039; &lt;foo &amp; bar&gt; ' );
} );

QUnit.test( 'createDocumentFromHtml', function ( assert ) {
	var key, doc, expectedHead, expectedBody,
		cases = [
			{
				msg: 'simple document with doctype, head and body',
				html: '<!doctype html><html><head><title>Foo</title></head><body><p>Bar</p></body></html>',
				head: '<title>Foo</title>',
				body: '<p>Bar</p>'
			},
			{
				msg: 'simple document without doctype',
				html: '<html><head><title>Foo</title></head><body><p>Bar</p></body></html>',
				head: '<title>Foo</title>',
				body: '<p>Bar</p>'
			},
			{
				msg: 'document with missing closing tags and missing <html> tag',
				html: '<!doctype html><head><title>Foo</title><base href="yay"><body><p>Bar<b>Baz',
				head: '<title>Foo</title><base href="yay" />',
				body: '<p>Bar<b>Baz</b></p>'
			},
			{
				msg: 'empty string results in empty document',
				html: '',
				head: '',
				body: ''
			}
		];
	QUnit.expect( cases.length * 2 );
	for ( key in cases ) {
		doc = ve.createDocumentFromHtml( cases[key].html );
		expectedHead = $( '<head>' ).html( cases[key].head ).get( 0 );
		expectedBody = $( '<body>' ).html( cases[key].body ).get( 0 );
		assert.equalDomElement( $( 'head', doc ).get( 0 ), expectedHead, cases[key].msg + ' (head)' );
		assert.equalDomElement( $( 'body', doc ).get( 0 ), expectedBody, cases[key].msg + ' (body)' );
	}
} );

QUnit.test( 'isBlockElement/isVoidElement', 10, function ( assert ) {
	assert.strictEqual( ve.isBlockElement( 'div' ), true, '"div" is a block element' );
	assert.strictEqual( ve.isBlockElement( 'SPAN' ), false, '"SPAN" is not a block element' );
	assert.strictEqual( ve.isBlockElement( 'a' ), false, '"a" is not a block element' );
	assert.strictEqual( ve.isBlockElement( document.createElement( 'div' ) ), true, '<div> is a block element' );
	assert.strictEqual( ve.isBlockElement( document.createElement( 'span' ) ), false, '<span> is not a block element' );

	assert.strictEqual( ve.isVoidElement( 'img' ), true, '"img" is a void element' );
	assert.strictEqual( ve.isVoidElement( 'DIV' ), false, '"DIV" is not a void element' );
	assert.strictEqual( ve.isVoidElement( 'span' ), false, '"span" is not a void element' );
	assert.strictEqual( ve.isVoidElement( document.createElement( 'img' ) ), true, '<img> is a void element' );
	assert.strictEqual( ve.isVoidElement( document.createElement( 'div' ) ), false, '<div> is not a void element' );
} );

// TODO: ve.isUnattachedCombiningMark

// TODO: ve.getByteOffset

// TODO: ve.getClusterOffset

QUnit.test( 'graphemeSafeSubstring', function ( assert ) {
	var i,
		text = '12\ud860\udee245\ud860\udee2789\ud860\udee2bc',
		cases = [
			{
				msg: 'start and end inside multibyte',
				start: 3,
				end: 12,
				expected: [ '\ud860\udee245\ud860\udee2789\ud860\udee2', '45\ud860\udee2789' ]
			},
			{
				msg: 'start and end next to multibyte',
				start: 4,
				end: 11,
				expected: [ '45\ud860\udee2789', '45\ud860\udee2789' ]
			},
			{
				msg: 'complete string',
				start: 0,
				end: text.length,
				expected: [ text, text ]
			},
			{
				msg: 'collapsed selection inside multibyte',
				start: 3,
				end: 3,
				expected: [ '\ud860\udee2', '' ]
			}
		];
	QUnit.expect( cases.length * 2 );
	for ( i = 0; i < cases.length; i++ ) {
		assert.strictEqual(
			ve.graphemeSafeSubstring( text, cases[i].start, cases[i].end, true ),
			cases[i].expected[0],
			cases[i].msg + ' (outer)'
		);
		assert.strictEqual(
			ve.graphemeSafeSubstring( text, cases[i].start, cases[i].end, false ),
			cases[i].expected[1],
			cases[i].msg + ' (inner)'
		);
	}
} );

QUnit.test( 'transformStyleAttributes', function ( assert ) {
	var i, wasStyleAttributeBroken, oldNormalizeAttributeValue,
		normalizeColor = function ( name, value ) {
			if ( name === 'style' && value === 'color:#ffd' ) {
				return 'color: rgb(255, 255, 221);';
			}
			return value;
		},
		normalizeBgcolor = function ( name, value ) {
			if ( name === 'bgcolor' ) {
				return value && value.toLowerCase();
			}
			return value;
		},
		cases = [
			{
				msg: 'Empty tags are not changed self-closing tags',
				before: '<html><head></head><body>Hello <a href="foo"></a> world</body></html>'
			},
			{
				msg: 'HTML string with doctype is parsed correctly',
				before: '<!DOCTYPE html><html><head><title>Foo</title></head><body>Hello</body></html>'
			},
			{
				msg: 'Style attributes are masked then unmasked',
				before: '<body><div style="color:#ffd">Hello</div></body>',
				masked: '<body><div style="color:#ffd" data-ve-style="color:#ffd">Hello</div></body>'
			},
			{
				msg: 'Style attributes that differ but normalize the same are overwritten when unmasked',
				masked: '<body><div style="color: rgb(255, 255, 221);" data-ve-style="color:#ffd">Hello</div></body>',
				after: '<body><div style="color:#ffd">Hello</div></body>',
				normalize: normalizeColor
			},
			{
				msg: 'Style attributes that do not normalize the same are not overwritten when unmasked',
				masked: '<body><div style="color: rgb(0, 0, 0);" data-ve-style="color:#ffd">Hello</div></body>',
				after: '<body><div style="color: rgb(0, 0, 0);">Hello</div></body>',
				normalize: normalizeColor
			},
			{
				msg: 'bgcolor attributes are masked then unmasked',
				before: '<body><table><tr bgcolor="#FFDEAD"></tr></table></body>',
				masked: '<body><table><tr bgcolor="#FFDEAD" data-ve-bgcolor="#FFDEAD"></tr></table></body>'
			},
			{
				msg: 'bgcolor attributes that differ but normalize the same are overwritten when unmasked',
				masked: '<body><table><tr bgcolor="#ffdead" data-ve-bgcolor="#FFDEAD"></tr></table></body>',
				after: '<body><table><tr bgcolor="#FFDEAD"></tr></table></body>',
				normalize: normalizeBgcolor
			},
			{
				msg: 'bgcolor attributes that do not normalize the same are not overwritten when unmasked',
				masked: '<body><table><tr bgcolor="#fffffa" data-ve-bgcolor="#FFDEAD"></tr></table></body>',
				after: '<body><table><tr bgcolor="#fffffa"></tr></table></body>',
				normalize: normalizeBgcolor
			}
		];
	QUnit.expect( 2 * cases.length );

	// Force transformStyleAttributes to think that we're in a broken browser
	wasStyleAttributeBroken = ve.isStyleAttributeBroken;
	ve.isStyleAttributeBroken = true;

	for ( i = 0; i < cases.length; i++ ) {
		if ( cases[i].normalize ) {
			oldNormalizeAttributeValue = ve.normalizeAttributeValue;
			ve.normalizeAttributeValue = cases[i].normalize;
		}
		if ( cases[i].before ) {
			assert.strictEqual(
				ve.transformStyleAttributes( cases[i].before, false )
					// Firefox adds linebreaks after <!DOCTYPE>s
					.replace( '<!DOCTYPE html>\n', '<!DOCTYPE html>' ),
				cases[i].masked || cases[i].before,
				cases[i].msg + ' (masking)'
			);
		} else {
			assert.ok( true, cases[i].msg + ' (no masking test)' );
		}
		assert.strictEqual(
			ve.transformStyleAttributes( cases[i].masked || cases[i].before, true )
				// Firefox adds a linebreak after <!DOCTYPE>s
				.replace( '<!DOCTYPE html>\n', '<!DOCTYPE html>' ),
			cases[i].after || cases[i].before,
			cases[i].msg + ' (unmasking)'
		);

		if ( cases[i].normalize ) {
			ve.normalizeAttributeValue = oldNormalizeAttributeValue;
		}
	}
} );

QUnit.test( 'normalizeNode', function ( assert ) {
	var i, actual, expected, wasNormalizeBroken,
		cases = [
			{
				msg: 'Merge two adjacent text nodes',
				before: {
					type: 'p',
					children: [
						{ type: '#text', text: 'Foo' },
						{ type: '#text', text: 'Bar' }
					]
				},
				after: {
					type: 'p',
					children: [
						{ type: '#text', text: 'FooBar' }
					]
				}
			},
			{
				msg: 'Merge three adjacent text nodes',
				before: {
					type: 'p',
					children: [
						{ type: '#text', text: 'Foo' },
						{ type: '#text', text: 'Bar' },
						{ type: '#text', text: 'Baz' }
					]
				},
				after: {
					type: 'p',
					children: [
						{ type: '#text', text: 'FooBarBaz' }
					]
				}
			},
			{
				msg: 'Drop empty text node after single text node',
				before: {
					type: 'p',
					children: [
						{ type: '#text', text: 'Foo' },
						{ type: '#text', text: '' }
					]
				},
				after: {
					type: 'p',
					children: [
						{ type: '#text', text: 'Foo' }
					]
				}
			},
			{
				msg: 'Drop empty text node after two text nodes',
				before: {
					type: 'p',
					children: [
						{ type: '#text', text: 'Foo' },
						{ type: '#text', text: 'Bar' },
						{ type: '#text', text: '' }
					]
				},
				after: {
					type: 'p',
					children: [
						{ type: '#text', text: 'FooBar' }
					]
				}
			},
			{
				msg: 'Normalize recursively',
				before: {
					type: 'div',
					children: [
						{ type: '#text', text: '' },
						{
							type: 'p',
							children: [
								{ type: '#text', text: 'Foo' },
								{ type: '#text', text: 'Bar' }
							]
						},
						{
							type: 'p',
							children: [
								{ type: '#text', text: 'Baz' },
								{ type: '#text', text: 'Quux' }
							]
						},
						{ type: '#text', text: 'Whee' }
					]
				},
				after: {
					type: 'div',
					children: [
						{
							type: 'p',
							children: [
								{ type: '#text', text: 'FooBar' }
							]
						},
						{
							type: 'p',
							children: [
								{ type: '#text', text: 'BazQuux' }
							]
						},
						{ type: '#text', text: 'Whee' }
					]
				}
			}
		];
	QUnit.expect( 2 * cases.length );

	// Force normalizeNode to think native normalization is broken so it uses the manual
	// normalization code
	wasNormalizeBroken = ve.isNormalizeBroken;
	ve.isNormalizeBroken = true;

	for ( i = 0; i < cases.length; i++ ) {
		actual = ve.test.utils.buildDom( cases[i].before );
		expected = ve.test.utils.buildDom( cases[i].after );
		ve.normalizeNode( actual );
		assert.equalDomElement( actual, expected, cases[i].msg );
		assert.ok( actual.isEqualNode( expected ), cases[i].msg + ' (isEqualNode)' );
	}

	ve.isNormalizeBroken = wasNormalizeBroken;
} );

QUnit.test( 'getCommonAncestor', function ( assert ) {
	var doc, nodes, tests, i, len, test, testNodes, ancestorNode;
	doc = ve.createDocumentFromHtml( '<html><div><p>AA<i><b>BB<img src="#"></b></i>CC</p>DD</div>EE' );
	tests = [
		{ nodes: 'b b', ancestor: 'b' },
		{ nodes: 'b i', ancestor: 'i' },
		{ nodes: 'textB img', ancestor: 'b' },
		{ nodes: 'p textD', ancestor: 'div' },
		{ nodes: 'textC img', ancestor: 'p' },
		{ nodes: 'textC b', ancestor: 'p' },
		{ nodes: 'textC textD', ancestor: 'div' },
		{ nodes: 'textA textB', ancestor: 'p' },
		{ nodes: 'textA img', ancestor: 'p' },
		{ nodes: 'img textE', ancestor: 'body' },
		{ nodes: 'textA textB textC textD', ancestor: 'div' },
		{ nodes: 'textA i b textC', ancestor: 'p' },
		{ nodes: 'body div head p', ancestor: 'html' }
	];
	nodes = {};
	nodes.html = doc.documentElement;
	nodes.head = doc.head;
	nodes.body = doc.body;
	nodes.div = doc.getElementsByTagName( 'div' )[0];
	nodes.p = doc.getElementsByTagName( 'p' )[0];
	nodes.b = doc.getElementsByTagName( 'b' )[0];
	nodes.i = doc.getElementsByTagName( 'i' )[0];
	nodes.img = doc.getElementsByTagName( 'img' )[0];
	nodes.textA = nodes.p.childNodes[0];
	nodes.textB = nodes.b.childNodes[0];
	nodes.textC = nodes.p.childNodes[2];
	nodes.textD = nodes.div.childNodes[1];
	nodes.textE = nodes.body.childNodes[1];
	function getNode( name ) {
		return nodes[ name ];
	}
	QUnit.expect( tests.length );
	for ( i = 0, len = tests.length; i < len; i++ ) {
		test = tests[i];
		testNodes = test.nodes.split( /\s+/ ).map( getNode );
		ancestorNode = nodes[ test.ancestor ];
		assert.equal(
			ve.getCommonAncestor.apply( null, testNodes ),
			ancestorNode,
			test.nodes + ' -> ' + test.ancestor
		);
	}
} );
