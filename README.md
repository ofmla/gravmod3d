# gravmod3d
3D forward modeling of bodies discretized by rectangular prisms with parabolic density contrast

This is a modern Fortran implementation of the three-dimensional gravity modeling with parabolic density contrast presented in [3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth](https://www.sciencedirect.com/science/article/pii/S0098300401000802) by V. Chakravarthi, H. M. Raghuram and S. B. Singh.

## Building gravmod3d

A [Fortran Package Manager](https://github.com/fortran-lang/fpm) manifest file is included, so that the library and a simple example can be compiled with FPM. For example:

```
fpm build --profile release
fpm run --profile release -- data/input.dat  data/synthetic_xyz.dat data/grid_xy.dat data/gravity_anomaly.dat
```

The example program computes the gravity field of a sedimentary basin (which is approximated by a set of prisms) on a regular grid of observation points. It reads four command-line arguments: the relative paths for four files. The first three are input files and the last one is the output file. The first input file contains six rows/entries: the number of prisms, the number of observation points, the parameters that define the parabolic law of density variation with depth, that is, the density contrast (g/cc) at the surface and the alpha constant (g/cc/km) and the dimensions of prisms rectangular bases (km) in the x- and y- directions. The second input file describes the 3D sediment-basement contact. It contains X-coordinate, Y-coordinate, and Z-value triplets. The XY-coordinates (km) represent the geometrical centers on prisms top. Z values (km) represent the bottom boundaries of the prisms, which coincide with the basement interface. The third input file contains the XY-coordinates (km) of the regular grid of observations. Such coordinates can not be placed on horizontal limits of the prisms (edges and corners) to prevent numerical problems during the computing of the gravity field. The content of the output file corresponds to the XY-coordinates (km) of the regular grid of observations, along with the gravity field values (mgal).

To build an Open-MP version of the library, use:
```
fpm build --profile release --flag "-fopenmp"
```
In this case, you must set the `OMP_SET_NUM_THREADS` environment variable to specify how many threads you wish to use. Use the following commands to run the example program with two OpenMP threads
```
export OMP_NUM_THREADS=2
fpm run --profile release --flag "-fopenmp" -- data/input.dat  data/synthetic_xyz.dat data/grid_xy.dat data/gravity_anomaly.dat
```

To use `gravmod3d` within your FPM project, add the following to your `fpm.toml` file:
```toml
[dependencies]
gravmod3d = { git="https://github.com/ofmla/gravmod3d.git" }
```
Gravity anomaly data generated from 3D synthetic model example can be ploted with the `contour.sh` [GMT](https://www.generic-mapping-tools.org/) script after ran any of the `fpm run` commands above. Another GMT script `plot_3d.sh` is also provided for plotting the 3D synthetic model. Both scripts are placed in the `data/gmt_scripts/` folder

<p align="center">
  <img src="https://github.com/ofmla/gravmod3d/blob/main/data/gmt_scripts/contour_light.svg#gh-light-mode-only" width="250"/> <img src="https://github.com/ofmla/gravmod3d/blob/main/data/gmt_scripts/true_light.svg#gh-light-mode-only" width="300"/>
</p>
<p align="center">
  <img src="https://github.com/ofmla/gravmod3d/blob/main/data/gmt_scripts/contour_dark.svg#gh-dark-mode-only" width="250"/> <img src="https://github.com/ofmla/gravmod3d/blob/main/data/gmt_scripts/true_dark.svg#gh-dark-mode-only" width="300"/>
</p>

## References

* [V. Chakravarthi, H.M. Raghuram, S.B. Singh,
3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth,
Computers & Geosciences,
Volume 28, Issue 1,
2002,
Pages 53-57,
ISSN 0098-3004,
https://doi.org/10.1016/S0098-3004(01)00080-2.
(https://www.sciencedirect.com/science/article/pii/S0098300401000802)](https://doi.org/10.1016/S0098-3004(01)00080-2)
* [original source code](https://iamg.org/documents/oldftp/VOL28/v28-01-06.zip)

## License

* All refactored Fortran source code is made available under the [BSD 3-clause license](https://github.com/ofmla/gravmod3d/blob/main/LICENSE). You can freely use and modify the code, without warranty, so long as you provide attribution to the authors.

