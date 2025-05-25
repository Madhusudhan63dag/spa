registerPaint('fragmentation', class {
  static get inputProperties() {
    return [
      '--f-n',
      '--f-o'
    ];
  }

  paint(ctx, size, properties) {
    const n = properties.get('--f-n').value;
    const o = properties.get('--f-o').value;
    const w = size.width;
    const h = size.height;
    const l = 7;

    /* seeded random */
    const mask = 0xffffffff;
    const seed = 30;
    let m_w  = (123456789 + seed) & mask;
    let m_z  = (987654321 - seed) & mask;
    let random = function() {
      m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

      var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
    };
    /**/
    var dots = [[0,0],[0,w],[h,0],[w,h]];
    for (var i = 0; i < n; i++) {
      dots.push([random() * w, random() * h]);
    }
    var delaunay = Delaunator.from(dots);
    var triangles = delaunay.triangles;
    for (var i = 0; i < triangles.length; i += 3) {
      ctx.beginPath();
      ctx.moveTo(dots[triangles[i]][0], dots[triangles[i]][1]);
      ctx.lineTo(dots[triangles[i + 1]][0], dots[triangles[i + 1]][1]);
      ctx.lineTo(dots[triangles[i + 2]][0], dots[triangles[i + 2]][1]);
      
      ctx.closePath();
      var alpha = (random() * (l - 1) + 1) - (1 - o) * l;
      ctx.fillStyle = 'rgba(0,0,0,' + alpha + ')';
      ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
      ctx.stroke();
      ctx.fill();
    }
  }
});
