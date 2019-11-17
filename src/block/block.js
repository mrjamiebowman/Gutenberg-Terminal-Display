/**
 * BLOCK: hacking-console-results
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { 
	RichText, 
	AlignmentToolbar, 
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls, 
 } = wp.editor;
const { 
	Toolbar,
	Button,
	Tooltip,
	PanelBody,
	PanelRow,
	FormToggle,
	Spinner,
	TextControl
} = wp.components;
const { withSelect } = wp.data;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mrjb/terminal-display', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Terminal Display' ), // Block title.
	icon: 'media-code', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [				
		__( 'Terminal Display' ),
		__( 'Hacking Terminal' ),
		__( 'Parrot OS Terminal' ),
		__( 'ParrotOS Terminal' ),
	],

	attributes: {
		command: {
			type: 'string',
			default: 'nmap -sV 127.0.0.1',
			source: 'attribute',
			selector: 'a',
		},
		terminalData: {
			source: 'html',
			selector: 'p',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		/**
		 * Update content on change.
		 */

		function onChangeCommand (value) {
			props.setAttributes( { command: value } );
		}

		function onChangeTerminalData (value) {
			props.setAttributes( { terminalData: value } );
		}

		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title="Terminal Settings" initialOpen="true">
						<PanelRow>
							<TextControl format="string" label="Command" value={ props.attributes.command } onChange={ onChangeCommand }></TextControl>
						</PanelRow>
						<PanelRow>

						</PanelRow>
					</PanelBody>
				</InspectorControls>				
				<div className="terminal">
					<div className="command">
						<span className="red">┌─[✗</span>]─[<span className="user">user</span><span className="at">@</span><span className="hostname">parrot</span><span className="red">]─[</span><span className="tilde">~</span><span className="red">]</span><br/>
						<span className="red">└──╼</span> <span className="at">$</span> <a href="javascript:none" title="Click to copy">{ props.attributes.command }</a>
					</div>
					<RichText
						format="string"
						formattingControls={ [] }
						placeholder={ __( 'Terminal Output' ) }
						onChange={ onChangeTerminalData }
						value={ props.attributes.terminalData }
						formattingControls = { [ 'bold', 'align' ] }
						tagName="p"
					/>
				</div>
				<div className="info-tag"><a href="https://github.com/mrjamiebowman/Gutenberg-Terminal-Display" target="_blank">(Gutenberg Terminal Display)</a></div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		var command = props.attributes.command;
		var content = props.attributes.terminalData;

		return (		
			<div className={ props.className }>
				<div className="terminal">
					<div className="command">
						<span className="red">┌─[✗</span>]─[<span className="user">user</span><span className="at">@</span><span className="hostname">parrot</span><span className="red">]─[</span><span className="tilde">~</span><span className="red">]</span><br/>
						<span className="red">└──╼</span> <span className="at">$</span> <a href="javascript:none" title="Click to copy">{ command }</a>
					</div>
					<p>
						{ content }
					</p>
				</div>
				<div className="info-tag"><a href="https://github.com/mrjamiebowman/Gutenberg-Terminal-Display" target="_blank">(Gutenberg Terminal Display)</a></div>
			</div>		
		);
	},
} );
