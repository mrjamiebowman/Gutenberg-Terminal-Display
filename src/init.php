<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function mrjb_terminal_display_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.	
	wp_register_style(
		'terminal-display-block-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'terminal-display-block-editor-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'terminal-display-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'terminal-display-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'mrjb/terminal-display', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'terminal-display-block-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'terminal-display-block-editor-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'terminal-display-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'mrjb_terminal_display_block_assets' );


// editor scripts/css
function mrjb_terminal_display_block_resources_editor() {
	
}
add_action( 'enqueue_block_editor_assets', 'mrjb_terminal_display_block_resources_editor' );

// frontend scripts/css
function mrjb_terminal_display_block_resources_fontend() {
	wp_enqueue_script(
        'terminal-display-block-js',
        plugins_url( '/block/scripts.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'block/scripts.js' )	
    );

	// parrot os like font "Monospace Regular"
	wp_enqueue_style( 'wpb-google-fonts-parrotos', 'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap', false ); 
	wp_enqueue_style( 'wpb-google-fonts-powershell', 'https://fonts.googleapis.com/css?family=Inconsolata&display=swap', false ); 
}
	 
add_action( 'enqueue_block_assets', 'mrjb_terminal_display_block_resources_fontend' );