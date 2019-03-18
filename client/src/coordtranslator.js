


var axis = 6378137.0; // GRS 80.
var flattening = 1.0 / 298.257222101; // GRS 80.
var lat_of_origin = 0.0;
var central_meridian = 11.0 + 18.375/60.0;
var scale = 1.000006000000;
var false_northing = -667.282;
var false_easting = 1500025.141;

function geodetic_to_grid(latitude, longitude) {
	var x_y = new Array(2);
	if (central_meridian == null) {
		return x_y;
	}
	// Prepare ellipsoid-based stuff.
	var e2 = flattening * (2.0 - flattening);
	var n = flattening / (2.0 - flattening);
	var a_roof = axis / (1.0 + n) * (1.0 + n*n/4.0 + n*n*n*n/64.0);
	var A = e2;
	var B = (5.0*e2*e2 - e2*e2*e2) / 6.0;
	var C = (104.0*e2*e2*e2 - 45.0*e2*e2*e2*e2) / 120.0;
	var D = (1237.0*e2*e2*e2*e2) / 1260.0;
	var beta1 = n/2.0 - 2.0*n*n/3.0 + 5.0*n*n*n/16.0 + 41.0*n*n*n*n/180.0;
	var beta2 = 13.0*n*n/48.0 - 3.0*n*n*n/5.0 + 557.0*n*n*n*n/1440.0;
	var beta3 = 61.0*n*n*n/240.0 - 103.0*n*n*n*n/140.0;
	var beta4 = 49561.0*n*n*n*n/161280.0;

	// Convert.
	var deg_to_rad = Math.PI / 180.0;
	var phi = latitude * deg_to_rad;
	var lambda = longitude * deg_to_rad;
	var lambda_zero = central_meridian * deg_to_rad;

	var phi_star = phi - Math.sin(phi) * Math.cos(phi) * (A +
					B*Math.pow(Math.sin(phi), 2) +
					C*Math.pow(Math.sin(phi), 4) +
					D*Math.pow(Math.sin(phi), 6));
	var delta_lambda = lambda - lambda_zero;
	var xi_prim = Math.atan(Math.tan(phi_star) / Math.cos(delta_lambda));
	var eta_prim = math_atanh(Math.cos(phi_star) * Math.sin(delta_lambda));
	var x = scale * a_roof * (xi_prim +
					beta1 * Math.sin(2.0*xi_prim) * math_cosh(2.0*eta_prim) +
					beta2 * Math.sin(4.0*xi_prim) * math_cosh(4.0*eta_prim) +
					beta3 * Math.sin(6.0*xi_prim) * math_cosh(6.0*eta_prim) +
					beta4 * Math.sin(8.0*xi_prim) * math_cosh(8.0*eta_prim)) +
					false_northing;
	var y = scale * a_roof * (eta_prim +
					beta1 * Math.cos(2.0*xi_prim) * math_sinh(2.0*eta_prim) +
					beta2 * Math.cos(4.0*xi_prim) * math_sinh(4.0*eta_prim) +
					beta3 * Math.cos(6.0*xi_prim) * math_sinh(6.0*eta_prim) +
					beta4 * Math.cos(8.0*xi_prim) * math_sinh(8.0*eta_prim)) +
					false_easting;
	x_y[0] = Math.round(x * 1000.0) / 1000.0;
	x_y[1] = Math.round(y * 1000.0) / 1000.0;
//	x_y[0] = x;
//	x_y[1] = y;
	return x_y;
}
// Missing functions in the Math library.
function math_sinh(value) {
	return 0.5 * (Math.exp(value) - Math.exp(-value));
}
function math_cosh(value) {
	return 0.5 * (Math.exp(value) + Math.exp(-value));
}
function math_atanh(value) {
	return 0.5 * Math.log((1.0 + value) / (1.0 - value));
}
export default geodetic_to_grid;
