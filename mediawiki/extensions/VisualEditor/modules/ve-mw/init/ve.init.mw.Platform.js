/*!
 * VisualEditor MediaWiki Initialization Platform class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */

/**
 * Initialization MediaWiki platform.
 *
 * @class
 * @extends ve.init.Platform
 *
 * @constructor
 */
ve.init.mw.Platform = function VeInitMwPlatform() {
	// Parent constructor
	ve.init.Platform.call( this );

	// Properties
	this.externalLinkUrlProtocolsRegExp = new RegExp(
		'^(' + mw.config.get( 'wgUrlProtocols' ) + ')'
	);
	this.parsedMessages = {};
	this.linkCache = new ve.init.mw.LinkCache();
	this.imageInfoCache = new ve.init.mw.ImageInfoCache();
};

/* Inheritance */

OO.inheritClass( ve.init.mw.Platform, ve.init.Platform );

/* Static Methods */

/** @inheritdoc */
ve.init.mw.Platform.static.getSystemPlatform = function () {
	return $.client.profile().platform;
};

/** @inheritdoc */
ve.init.mw.Platform.static.isInternetExplorer = function () {
	return $.client.profile().name === 'msie';
};

/* Methods */

/** @inheritdoc */
ve.init.mw.Platform.prototype.getExternalLinkUrlProtocolsRegExp = function () {
	return this.externalLinkUrlProtocolsRegExp;
};

/** @inheritdoc */
ve.init.mw.Platform.prototype.addMessages = function ( messages ) {
	return mw.messages.set( messages );
};

/**
 * @method
 * @inheritdoc
 */
ve.init.mw.Platform.prototype.getMessage = mw.msg.bind( mw );

/** @inheritdoc */
ve.init.mw.Platform.prototype.addParsedMessages = function ( messages ) {
	for ( var key in messages ) {
		this.parsedMessages[key] = messages[key];
	}
};

/** @inheritdoc */
ve.init.mw.Platform.prototype.getParsedMessage = function ( key ) {
	if ( Object.prototype.hasOwnProperty.call( this.parsedMessages, key ) ) {
		// Prefer parsed results from VisualEditorDataModule if available.
		return this.parsedMessages[key];
	}
	// Fallback to regular messages, with mw.message html escaping applied.
	return mw.message( key ).escaped();
};

/** @inheritdoc */
ve.init.mw.Platform.prototype.getLanguageCodes = function () {
	return Object.keys(
		mw.language.getData( mw.config.get( 'wgUserLanguage' ), 'languageNames' ) ||
		$.uls.data.getAutonyms()
	);
};

/** @inheritdoc */
ve.init.mw.Platform.prototype.getLanguageName = function ( code ) {
	var languageNames = mw.language.getData( mw.config.get( 'wgUserLanguage' ), 'languageNames' ) ||
		$.uls.data.getAutonyms();
	return languageNames[code] || '';
};

/**
 * @method
 * @inheritdoc
 */
ve.init.mw.Platform.prototype.getLanguageAutonym = $.uls.data.getAutonym;

/**
 * @method
 * @inheritdoc
 */
ve.init.mw.Platform.prototype.getLanguageDirection = $.uls.data.getDir;

/** @inheritdoc */
ve.init.mw.Platform.prototype.getUserLanguages = function () {
	return mw.language.getFallbackLanguageChain();
};

/**
 * @inheritdoc
 */
ve.init.mw.Platform.prototype.fetchSpecialCharList = function () {
	var characters = {},
		otherGroupName = mw.msg( 'visualeditor-special-characters-group-other' ),
		otherMsg = mw.msg( 'visualeditor-quick-access-characters.json' ),
		groupObject;

	if ( otherMsg !== '<visualeditor-quick-access-characters.json>' ) {
		try {
			characters[otherGroupName] = JSON.parse( otherMsg );
		} catch ( err ) {
			ve.log( 've.init.mw.Platform: Could not parse the Special Character list.' );
			ve.log( err );
		}
	}

	$.each( mw.language.specialCharacters, function ( groupName, groupCharacters ) {
		groupObject = {}; // key is label, value is char to insert
		$.each( groupCharacters, function ( charKey, charVal ) {
			// VE can only handle replace right now (which is the vast majority of the
			// entries), not encapsulate.
			// Can't handle titleMsg either.
			if ( typeof charVal === 'string' ) {
				groupObject[charVal] = charVal;
			} else if ( typeof charVal === 'object' && 0 in charVal && 1 in charVal ) {
				groupObject[charVal[0]] = charVal[1];
			}
		} );
		characters[mw.msg( 'special-characters-group-' + groupName )] = groupObject;
	} );

	// This implementation always resolves instantly
	return $.Deferred().resolve( characters ).promise();
};

/* Initialization */

ve.init.platform = new ve.init.mw.Platform();

/* Extension */

OO.ui.getUserLanguages = ve.init.platform.getUserLanguages.bind( ve.init.platform );

OO.ui.msg = ve.init.platform.getMessage.bind( ve.init.platform );
