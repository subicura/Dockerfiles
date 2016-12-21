/*!
 * VisualEditor ContentEditable AlignableNode class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * ContentEditable Alignable node.
 *
 * @class
 * @abstract
 * @extends ve.ce.ClassAttributeNode
 *
 * @constructor
 */
ve.ce.AlignableNode = function VeCeAlignableNode() {
	// Parent constructor
	ve.ce.AlignableNode.super.apply( this, arguments );

	this.align = null;
};

/* Inheritance */

OO.inheritClass( ve.ce.AlignableNode, ve.ce.ClassAttributeNode );

/* Events */

/**
 * @event align
 * @param {string} align New alignment
 */

/**
 * @inheritdoc
 */
ve.ce.AlignableNode.prototype.updateAttributeClasses = function () {
	ve.ce.AlignableNode.super.prototype.updateAttributeClasses.apply( this, arguments );
	var align = this.model.getAttribute( 'align' );
	if ( align && align !== this.align ) {
		this.emit( 'align', align );
		this.align = align;
	}
};
