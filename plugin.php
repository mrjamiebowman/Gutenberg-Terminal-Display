<?php
/**
 * Plugin Name: Terminal Display (Gutenberg)
 * Plugin URI: https://github.com/mrjamiebowman/Gutenberg-Terminal-Display
 * Description: Gutenberg Terminal Display plugin for displaying terminal output.
 * Author: mrjamiebowman
 * Author URI: https://www.mrjamiebowman.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
