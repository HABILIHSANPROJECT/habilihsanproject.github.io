# M3U8 Player with Adaptive Bitrate Streaming

This project provides a simple HTML, CSS, and JavaScript-based M3U8 player with adaptive bitrate streaming support. Users can watch videos in different resolutions based on their network conditions.

## Features

- **Adaptive Bitrate Streaming**: The player dynamically adjusts the video quality based on the viewer's internet connection, providing a smooth viewing experience.
- **Responsive Design**: The player is responsive, adapting to various screen sizes and devices.
- **Customizable**: You can easily customize the player's appearance and behavior to suit your needs.
- **Easy Setup**: Setting up the player is straightforward, and it supports HLS (HTTP Live Streaming) playlists in M3U8 format.

## Getting Started

Follow these steps to get the M3U8 player up and running on your website:

1. **Clone or Download**:

   Clone this repository or download the project files to your local machine.

2. **HTML Structure**:

   Open the `index.html` file and customize the HTML structure. Replace `"your-video.m3u8"` with the actual URL or path to your M3U8 playlist file.

3. **JavaScript Configuration**:

   In the `index.html` file, configure the player's behavior and settings in the JavaScript section. You can adjust options such as autoplay, initial quality, and more.

4. **Multiple Resolutions**:

   Create an M3U8 playlist that includes different quality levels (resolutions). Ensure the playlist is hosted on a server accessible via the specified URLs in the HTML file.

5. **Style the Player**:

   Customize the player's appearance using CSS in the `index.css` file to match your design preferences.

6. **Serve Files**:

   Make sure both your M3U8 playlist and the associated video segments are hosted on a server accessible via the URLs you specified in the HTML file.

7. **Testing**:

   Test the player in various browsers and devices to ensure compatibility and adaptive bitrate streaming functionality.

## Dependencies

- [index.js](https://videojs.com/): A popular HTML5 video player library used in this project for video playback.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The project uses the Video.js library to provide a robust video player experience.
- Special thanks to the open-source community for providing tools and resources for HLS streaming.

## Contact

If you have any questions or feedback, feel free to contact us at [h48ilihsan@gmail.com].

Happy video streaming!
