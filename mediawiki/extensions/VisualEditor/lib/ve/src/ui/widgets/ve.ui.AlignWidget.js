/*!
 * VisualEditor UserInterface AlignWidget class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * Widget that lets the user edit alignment of an object
 *
 * @class
 * @extends OO.ui.ButtonSelectWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [dir='ltr'] Interface directionality
 */
ve.ui.AlignWidget = function VeUiAlignWidget( config ) {
	config = config || {};

	// Parent constructor
	ve.ui.AlignWidget.super.call( this, config );

	var alignButtons = [
			new OO.ui.ButtonOptionWidget( {
				$: this.$,
				data: 'left',
				icon: 'align-float-left',
				label: ve.msg( 'visualeditor-align-widget-left' )
			} ),
			new OO.ui.ButtonOptionWidget( {
				$: this.$,
				data: 'center',
				icon: 'align-center',
				label: ve.msg( 'visualeditor-align-widget-center' )
			} ),
			new OO.ui.ButtonOptionWidget( {
				$: this.$,
				data: 'right',
				icon: 'align-float-right',
				label: ve.msg( 'visualeditor-align-widget-right' )
			} )
		];

	if ( config.dir === 'rtl' ) {
		alignButtons = alignButtons.reverse();
	}

	this.addItems( alignButtons, 0 );

};

/* Inheritance */

OO.inheritClass( ve.ui.AlignWidget, OO.ui.ButtonSelectWidget );
