/*!
 * VisualEditor MWReferencesListContextItem class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * Context item for a MWReferencesList.
 *
 * @class
 * @extends ve.ui.ContextItem
 *
 * @constructor
 * @param {ve.ui.Context} context Context item is in
 * @param {ve.dm.Model} model Model item is related to
 * @param {Object} config Configuration options
 */
ve.ui.MWReferencesListContextItem = function VeMWReferencesListContextItem() {
	// Parent constructor
	ve.ui.MWReferencesListContextItem.super.apply( this, arguments );

	// Initialization
	this.$element.addClass( 've-ui-mwReferencesListContextItem' );
};

/* Inheritance */

OO.inheritClass( ve.ui.MWReferencesListContextItem, ve.ui.ContextItem );

/* Static Properties */

ve.ui.MWReferencesListContextItem.static.name = 'referencesList';

ve.ui.MWReferencesListContextItem.static.icon = 'references';

ve.ui.MWReferencesListContextItem.static.label =
	OO.ui.deferMsg( 'visualeditor-dialogbutton-referenceslist-tooltip' );

ve.ui.MWReferencesListContextItem.static.modelClasses = [ ve.dm.MWReferencesListNode ];

ve.ui.MWReferencesListContextItem.static.commandName = 'referencesList';

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.MWReferencesListContextItem.prototype.getDescription = function () {
	var group = this.model.getAttribute( 'refGroup' );

	return group ?
		ve.msg( 'visualeditor-dialog-referenceslist-contextitem-description-named', group ) :
		ve.msg( 'visualeditor-dialog-referenceslist-contextitem-description-general' );
};

/* Registration */

ve.ui.contextItemFactory.register( ve.ui.MWReferencesListContextItem );
