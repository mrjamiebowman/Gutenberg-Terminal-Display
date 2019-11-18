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
	AlignmentToolbar, 
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls, 
	RichText, 
 } = wp.editor;
const { 
	Toolbar,
	Button,
	Tooltip,
	PanelBody,
	PanelRow,
	FormToggle,
	SelectControl,
	Spinner,
	ToggleControl,
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
		terminalType: {
			type: 'string',
			default: 'parrotos'
		},
		command: {
			type: 'string',
			default: 'nmap -sV 127.0.0.1',
			source: 'attribute',
			selector: 'a',
		},
		user: {
			type: 'string',
			default: 'user'
		},
		hostname: {
			type: 'string',
			default: 'parrot'
		},
		showPluginLink: {
			type: 'Boolean',
			default: true
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

		function onChangeHostname (value) {
			props.setAttributes( { hostname: value } );
		}

		function onChangeShowPluginLink (value) {
			props.setAttributes( { showPluginLink: value } );
		}

		function onChangeTerminalData (value) {
			props.setAttributes( { terminalData: value } );
		}		

		function onChangeTerminalType (value) {
			props.setAttributes( { terminalType: value } );
		}

		function onChangeUser (value) {
			props.setAttributes( { user: value } );
		}

		function showPluginLink( value ) {
			if (value === true) {
				return { __html: '<a href="https://github.com/mrjamiebowman/Gutenberg-Terminal-Display" target="_blank">(Gutenberg Terminal Display)</a>'};
			}
			
			return { __html: '' };
		}

		return (
			<div className={ props.className }>
				<div className={ props.attributes.terminalType }>
					<InspectorControls>
						<PanelBody title={ __("Terminal Settings") } initialOpen={ true }>
							<PanelRow>
								<SelectControl label="Terminal" value={ props.attributes.terminalType } onChange={ onChangeTerminalType }
									options={
										[
											{ label: 'Black Prompt', value: 'black'},
											{ label: 'Parrot Security OS', value: 'parrotos'},
											{ label: 'PowerShell', value: 'ps'},
											{ label: 'BlackArch', value: 'blackarch'}
										]
									}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl format="string" label="Command" value={ props.attributes.command } onChange={ onChangeCommand }></TextControl>
							</PanelRow>							
							<PanelRow>
								<ToggleControl label="Show Plugin Link" checked={ props.attributes.showPluginLink } onChange={ onChangeShowPluginLink } help={ props.attributes.showPluginLink ? 'Showing link to Terminal Display plugin.' : 'Not showing plugin link' } />
							</PanelRow>				
						</PanelBody>
						<PanelBody title={ __("Black Prompt Settings")}>

						</PanelBody>						
						<PanelBody title={ __("Parrot OS Settings")}>
							<PanelRow>
								<TextControl format="string" label="User" value={ props.attributes.user } onChange={ onChangeUser }></TextControl>
							</PanelRow>		
							<PanelRow>
								<TextControl format="string" label="Hostname" value={ props.attributes.hostname } onChange={ onChangeHostname }></TextControl>
							</PanelRow>
						</PanelBody>
						<PanelBody title={ __("PowerShell Settings")}>

						</PanelBody>
						<PanelBody title={ __("BlackArch Settings")}>

						</PanelBody>
					</InspectorControls>				
					<div className="terminal">
						<div className="command">
							<span className="red">┌─[✗</span>]─[<span className="user">{ props.attributes.user }</span><span className="at">@</span><span className="hostname">{ props.attributes.hostname }</span><span className="red">]─[</span><span className="tilde">~</span><span className="red">]</span><br/>
							<span className="red">└──╼</span> <span className="at">$</span> <a href="javascript:none" title="Click to copy to clipboard">{ props.attributes.command }</a>
						</div>
						<RichText
							format="string"
							formattingControls={ [] }
							placeholder={ __( 'Put terminal output here...' ) }
							onChange={ onChangeTerminalData }
							value={ props.attributes.terminalData }
							formattingControls = { [ 'bold', 'align' ] }
							tagName="p"
						/>
					</div>
					<div dangerouslySetInnerHTML={ showPluginLink( props.attributes.showPluginLink ) } className="info-tag"></div>
				</div>
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
	save: ( props, onClickCopyCommand ) => {

		var terminal = props.attributes.terminalType; 
		var command = props.attributes.command;
		var content = props.attributes.terminalData;
		var showPlugin = props.attributes.showPluginLink;

		var htmlPluginLink = { __html: '' };
		if (showPlugin === true) {
			htmlPluginLink = { __html: '<a href="https://github.com/mrjamiebowman/Gutenberg-Terminal-Display" target="_blank" rel="noopener noreferrer">(Gutenberg Terminal Display)</a>'};
		}

		return (
			<div>
				<div className={ terminal }>
					<div className="terminal">
						<div className="command">
							<span className="red">┌─[✗</span>]─[<span className="user">{ props.attributes.user }</span><span className="at">@</span><span className="hostname">{ props.attributes.hostname }</span><span className="red">]─[</span><span className="tilde">~</span><span className="red">]</span><br/>
							<span className="red">└──╼</span> <span className="at">$</span> <a id="mrjb-btn-command" href="javascript:none" title="Click to copy to clipboard" onClick="mrjb_terminal_display_copy_to_clipboard(this)">{ command }</a>
						</div>
						<p>
							{ content }
						</p>
					</div>
					<div className="info-tag" dangerouslySetInnerHTML={ htmlPluginLink }></div>
				</div>		
			</div>		
		);
	},
} );
