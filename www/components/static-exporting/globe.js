import React from 'react';
import planetaryjs from 'planetary.js';

import LOCATIONS from './locations';

export default class Globe extends React.PureComponent {
  componentDidMount() {
    if (this.props.isMobile) return;

    const globe = planetaryjs.planet();
    globe.loadPlugin(
      planetaryjs.plugins.earth({
        topojson: { file: '/static/world-110m.json' },
        oceans: { fill: '#fefefe' },
        land: { fill: '#eee' },
        borders: { stroke: '#E5E3E3' }
      })
    );

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio - 120;

    globe.projection.translate([width / 2, height / 2]).scale(Math.min(width, height) / 2);

    globe.loadPlugin(planetaryjs.plugins.pings());
    this.interval = setInterval(() => {
      const cdnIndex = Math.floor(Math.random() * LOCATIONS.length);
      const { lat, lng } = LOCATIONS[cdnIndex];

      globe.plugins.pings.add(lng, lat, {
        color: '#0076ff',
        ttl: 1500,
        angle: Math.random() * 10
      });
    }, 300);

    const canvas = this.globe.current;
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio == 2) {
      canvas.width = 800;
      canvas.height = 800;
      const context = canvas.getContext('2d');
      context.scale(2, 2);
    }

    canvas.width = width;
    canvas.height = height;

    this.rotation = globe.projection.rotate();
    this.animateGlobe(globe);
    globe.draw(canvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.globeAnimation);
    clearInterval(this.interval);
  }

  animateGlobe = globe => {
    if (this.globeAnimation) {
      window.cancelAnimationFrame(this.globeAnimation);
    }
    this.globeAnimation = window.requestAnimationFrame(() => {
      this.rotation[0] += 0.1;
      if (this.rotation[0] >= 180) this.rotation[0] -= 360;
      globe.projection.rotate(this.rotation);

      this.animateGlobe(globe);
    });
  };

  globe = React.createRef();

  render() {
    if (this.props.isMobile) return null;
    return (
      <canvas
        ref={this.globe}
        style={{
          width: '100%',
          marginLeft: '50%',
          transform: 'translate3d(-50%,0,0)'
        }}
      />
    );
  }
}
