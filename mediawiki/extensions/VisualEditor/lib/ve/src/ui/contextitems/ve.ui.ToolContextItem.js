/*!
 * VisualEditor ToolContextItem class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * Context item for a tool.
 *
 * @extends ve.ui.ContextItem
 *
 * @param {ve.ui.Context} context Context item is in
 * @param {ve.dm.Model} model Model the item is related to
 * @param {Function} tool Tool class the item is based on
 * @param {Object} config Configuration options
 */
ve.ui.ToolContextItem = function VeToolContextItem( context, model, tool, config ) {
	// Parent constructor
	ve.ui.ToolContextItem.super.call( this, context, model, config );

	// Properties
	this.tool = tool;

	// Initialization
	this.setIcon( tool.static.icon );
	this.setLabel( tool.static.title );
	this.$element.addClass( 've-ui-toolContextItem' );
};

/* Inheritance */

OO.inheritClass( ve.ui.ToolContextItem, ve.ui.ContextItem );

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.ToolContextItem.prototype.getCommand = function () {
	return ve.ui.commandRegistry.lookup( this.tool.static.commandName );
};

/**
 * Get a description of the model.
 *
 * @return {string} Description of model
 */
ve.ui.ToolContextItem.prototype.getDescription = function () {
	var description = '';

	if ( this.model instanceof ve.dm.Annotation ) {
		description = ve.ce.annotationFactory.getDescription( this.model );
	} else if ( this.model instanceof ve.dm.Node ) {
		description = ve.ce.nodeFactory.getDescription( this.model );
	}

	return description;
};
