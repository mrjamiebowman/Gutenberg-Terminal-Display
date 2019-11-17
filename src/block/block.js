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
registerBlockType( 'cgb/block-hacking-console-results', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'ParrotOS Console Output' ), // Block title.
	icon: 'media-code', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [		
		__( 'Hacking Consoles' ),
		__( 'Parrot OS Console' ),
		__( 'ParrotOS Console' ),
	],

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
		function onChangeContent( newContent ) {
			debugger;
			props.setAttributes( { content: newContent } );
		}

		// Creates a <p class='wp-block-cgb-block-hacking-console-results'></p>.
		return (
			<div className={ props.className }>
				<p>
					<span className="red">┌─[✗</span>]─[<span className="user">user</span><span className="at">@</span><span className="hostname">parrot</span><span className="red">]─[</span><span className="tilde">~</span><span class="red">]</span>
					<span className="red">└──╼</span> <span className="at">$</span> sudo namp -sU 192.168.0.34
				</p>
				<p>
					20/tcp   closed ftp-data
					21/tcp   open   ftp         vsftpd 2.0.8 or later
					22/tcp   open   ssh         OpenSSH 7.2p2 Ubuntu 4 (Ubuntu Linux; protocol 2.0)
					53/tcp   open   domain      dnsmasq 2.75
					80/tcp   open   http        PHP cli server 5.5 or later
					139/tcp  open   netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
					666/tcp  open   doom?
					3306/tcp open   mysql       MySQL 5.7.12-0ubuntu1
				</p>
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
		return (
			<div className={ props.className }>
				<p>
					<span className="red">┌─[✗</span>]─[<span className="user">user</span><span className="at">@</span><span className="hostname">parrot</span><span className="red">]─[</span><span className="tilde">~</span><span class="red">]</span>
					<span className="red">└──╼</span> <span className="at">$</span> sudo namp -sU 192.168.0.34
				</p>
				<p>
					20/tcp   closed ftp-data
					21/tcp   open   ftp         vsftpd 2.0.8 or later
					22/tcp   open   ssh         OpenSSH 7.2p2 Ubuntu 4 (Ubuntu Linux; protocol 2.0)
					53/tcp   open   domain      dnsmasq 2.75
					80/tcp   open   http        PHP cli server 5.5 or later
					139/tcp  open   netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
					666/tcp  open   doom?
					3306/tcp open   mysql       MySQL 5.7.12-0ubuntu1
				</p>
			</div>
		);
	},
} );
