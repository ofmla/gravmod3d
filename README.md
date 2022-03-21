# gravmod3d
3D forward modeling of bodies discretized by rectangular prisms with parabolic density contrast

This is a modern Fortran implementation of the three-dimensional gravity modeling with parabolic density contrast presented in [3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth](https://www.sciencedirect.com/science/article/pii/S0098300401000802) by V. Chakravarthi, H. M. Raghuram and S. B. Singh.

## Building gravmod3d

A [Fortran Package Manager](https://github.com/fortran-lang/fpm) manifest file is included, so that the library and a simple example can be compiled with FPM. For example:

```
fpm build --profile release
fpm run --profile release
```
To build an Open-MP version of the library, use:
```
fpm build --profile release --flag "-fopenmp"
```
In this case, the example must be run via
```
fpm run --profile release --flag "-fopenmp"
```

To use `gravmod3d` within your FPM project, add the following to your `fpm.toml` file:
```toml
[dependencies]
gravmod3d = { git="https://github.com/ofmla/gravmod3d.git" }
```
Gravity anomaly data generated from 3D synthetic model example can be ploted with the `contour.sh` GMT script (in `/data/gmt_scripts/` folder) after ran `fpm run --profile release` or `fpm run --profile release --flag "-fopenmp"`.

<p align="center">
  <img src="https://github.com/ofmla/gravmod3d/blob/main/data/gmt_scripts/contour.svg#gh-light-mode-only" width="600"/>
</p>

Another GMT script `plot_3d.sh` is also provided in same folder for plotting the 3D synthetic model.

## References

1. [V. Chakravarthi, H.M. Raghuram, S.B. Singh,
3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth,
Computers & Geosciences,
Volume 28, Issue 1,
2002,
Pages 53-57,
ISSN 0098-3004,
https://doi.org/10.1016/S0098-3004(01)00080-2.
(https://www.sciencedirect.com/science/article/pii/S0098300401000802)](https://doi.org/10.1016/S0098-3004(01)00080-2)

## License

* All refactored Fortran source code is made available under the [BSD 3-clause license](https://github.com/ofmla/gravmod3d/blob/main/LICENSE). You can freely use and modify the code, without warranty, so long as you provide attribution to the authors.

