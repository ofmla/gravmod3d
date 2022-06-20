var tipuesearch = {"pages":[{"title":" gravmod3d ","text":"gravmod3d gravmod3d 3D forward modeling of bodies discretized by rectangular prisms with parabolic density contrast This is a modern Fortran implementation of the three-dimensional gravity modeling with parabolic density contrast presented in 3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth by V. Chakravarthi, H. M. Raghuram and S. B. Singh. Building gravmod3d A Fortran Package Manager manifest file is included, so that the library and a simple example can be compiled with FPM. For example: fpm build --profile release\nfpm run --profile release -- data/input.dat  data/synthetic_xyz.dat data/grid_xy.dat data/gravity_anomaly.dat The example program computes the gravity field of a sedimentary basin (which is approximated by a set of prisms) on a regular grid of observation points. It reads four command-line arguments: the relative paths for four files. The first three are input files and the last one is the output file. \n- The first input file contains six rows/entries: \n  - the number of prisms, \n  - the number of observation points, \n  - the parameters that define the parabolic law of density variation with depth, that is, \n    - the density contrast (g/cc) at the surface and \n    - the alpha constant (g/cc/km) and \n  - the dimensions of prisms rectangular bases (km) in the x- and y- directions. \n- The second input file describes the 3D sediment-basement contact. It contains X-coordinate, Y-coordinate, and Z-value triplets. The XY-coordinates (km) represent the geometrical centers on prisms top. Z values (km) represent the bottom boundaries of the prisms, which coincide with the basement interface.\n- The third input file contains the XY-coordinates (km) of the regular grid of observations. Such coordinates can not be placed on horizontal limits of the prisms (edges and corners) to prevent numerical problems during the computing of the gravity field. \n- The content of the output file corresponds to the XY-coordinates (km) of the regular grid of observations, along with the gravity field values (mgal). To run the unit test use fpm test To build an Open-MP version of the library, use: fpm build --profile release --flag \"-fopenmp\" In this case, you must set the OMP_SET_NUM_THREADS environment variable to specify how many threads you wish to use. Use the following commands to run the example program with two OpenMP threads export OMP_NUM_THREADS = 2 fpm run -- profile release -- flag \"-fopenmp\" -- data / input . dat data / synthetic_xyz . dat data / grid_xy . dat data / gravity_anomaly . dat To use gravmod3d within your FPM project, add the following to your fpm.toml file: [dependencies] gravmod3d = { git = \"https://github.com/ofmla/gravmod3d.git\" } Gravity anomaly data generated from 3D synthetic model example can be ploted with the contour.sh GMT script after ran any of the fpm run commands above. Another GMT script plot_3d.sh is also provided for plotting the 3D synthetic model. Both scripts are placed in the data/gmt_scripts/ folder NOTE: The 3D synthetic basin model is that used in the paper Regularization parameter selection in the 3D gravity inversion of the basement relief using GCV: A parallel approach , which describes a computationally efficient automatic method for the optimal selection of the regularization parameter in the 3D inversion of gravity data. References V. Chakravarthi, H.M. Raghuram, S.B. Singh,\n3-D forward gravity modeling of basement interfaces above which the density contrast varies continuously with depth,\nComputers & Geosciences,\nVolume 28, Issue 1,\n2002,\nPages 53-57,\nISSN 0098-3004,\nhttps://doi.org/10.1016/S0098-3004(01)00080-2.\n(https://www.sciencedirect.com/science/article/pii/S0098300401000802) original source code License All refactored Fortran source code is made available under the BSD 3-clause license . You can freely use and modify the code, without warranty, so long as you provide attribution to the authors. The basin model in file data/synthetic_xyz.dat is available under\nthe Creative Commons Attribution 4.0 License (CC-BY) Developer Info Oscar Mojica","tags":"home","loc":"index.html"},{"title":"gr3dprm – gravmod3d","text":"public function gr3dprm(x, t, y, z, sd, alpha) Computes the theoretical gravity anomaly of 3d rectangular/square block References Chakravarthi, V., H. M. Raghuram, and S. B. Singh, 2002, 3-D forward\n    gravity modeling of basement interfaces above which the density contrast\n    varies continuously with depth: Computers & Geosciences, 28, 53–57,\n    doi: 10.1016/S0098-3004(01)00080-2. Arguments Type Intent Optional Attributes Name real(kind=dp) :: x real(kind=dp) :: t real(kind=dp) :: y real(kind=dp) :: z real(kind=dp) :: sd real(kind=dp) :: alpha Return Value real(kind=dp) Contents Source Code gr3dprm Source Code real ( dp ) function gr3dprm ( x , t , y , z , sd , alpha ) implicit none real ( dp ) :: x , t , y , z , sd , alpha real ( dp ) :: g , dc , z2 , al4 , al5 , al6 , al8 , q1 , q2 , r1 , r2 , r3 , r4 real ( dp ) :: t1 , t2 , t3 , t4 , t5 , tt2 , ttr1 , ttr2 real ( dp ) :: ter1 , ter2 , ter3 , ter4 , ter5 real ( dp ) :: ter6 , ter7 , ter8 , ter9 , ter10 , ter11 real ( dp ) :: t41 , t42 , t51 , t52 , t61 , t62 real ( dp ) :: t71 , t72 , t81 , t82 , t91 , t92 , t101 , t102 real ( dp ) :: t111 , t112 , t122 , t131 , t132 real ( dp ) :: t141 , t142 , t143 , t144 , t145 dc = tog * sd ** 3 if ( z . eq . 0._dp ) then z2 = 1 1e-7 else z2 = z endif al5 = sd - alpha * z1 al6 = sd - alpha * z2 q1 = x + t q2 = x - t r1 = SQRT ( q1 ** 2 + y ** 2 + z1 ** 2 ) r2 = SQRT ( q2 ** 2 + y ** 2 + z1 ** 2 ) r3 = SQRT ( q2 ** 2 + y ** 2 + z2 ** 2 ) r4 = SQRT ( q1 ** 2 + y ** 2 + z2 ** 2 ) t1 = 1 / alpha t2 = ( ATAN (( y * q1 ) / ( z2 * r4 ))) / al6 - ( ATAN (( y * q1 ) / ( z1 * r1 ))) / al5 ttr1 = t1 * t2 tt2 = ( ATAN (( y * q2 ) / ( z2 * r3 ))) / al6 - ( ATAN (( y * q2 ) / ( z1 * r2 ))) / al5 ttr2 = t1 * tt2 ter1 = ttr1 - ttr2 t3 = y * q1 al8 = SQRT (( q1 ** 2 + y ** 2 ) * alpha ** 2 + sd ** 2 ) t41 = alpha * ( 2 * sd ** 2 + alpha ** 2 * ( q1 ** 2 + y ** 2 )) t42 = al8 * ( y ** 2 * alpha ** 2 + sd ** 2 ) * ( q1 ** 2 * alpha ** 2 + sd ** 2 ) t4 = t41 / t42 t51 = al5 * ( alpha * r4 * al8 + al8 ** 2 - sd * al6 ) t52 = al6 * ( alpha * r1 * al8 + al8 ** 2 - sd * al5 ) t5 = LOG ( t51 / t52 ) ter2 = t3 * t4 * t5 t61 = sd / ( alpha * ( sd ** 2 + y ** 2 * alpha ** 2 )) t62 = ATAN (( y * r4 ) / ( z2 * q1 )) - ATAN (( y * r1 ) / ( z1 * q1 )) ter3 = t61 * t62 t71 = sd / ( alpha * ( sd ** 2 + q1 ** 2 * alpha ** 2 )) t72 = ATAN (( q1 * r4 ) / ( z2 * y )) - ATAN (( q1 * r1 ) / ( z1 * y )) ter4 = t71 * t72 t81 = y / ( 2 * ( sd ** 2 + y ** 2 * alpha ** 2 )) t82 = LOG ((( q1 - r4 ) * ( q1 + r1 )) / (( q1 + r4 ) * ( q1 - r1 ))) ter5 = t81 * t82 t91 = q1 / ( 2 * ( sd ** 2 + q1 ** 2 * alpha ** 2 )) t92 = LOG ((( y - r4 ) * ( y + r1 )) / (( y + r4 ) * ( y - r1 ))) ter6 = t91 * t92 t101 = sd / ( alpha * ( sd ** 2 + y ** 2 * alpha ** 2 )) t102 = ATAN (( y * r3 ) / ( z2 * q2 )) - ATAN (( y * r2 ) / ( z1 * q2 )) ter7 = t101 * t102 t111 = sd / ( alpha * ( sd ** 2 + q2 ** 2 * alpha ** 2 )) t112 = ATAN (( q2 * r3 ) / ( z2 * y )) - ATAN (( q2 * r2 ) / ( z1 * y )) ter8 = t111 * t112 t122 = LOG ((( q2 - r3 ) * ( q2 + r2 )) / (( q2 + r3 ) * ( q2 - r2 ))) ter9 = t81 * t122 t131 = q2 / ( 2 * ( sd ** 2 + q2 ** 2 * alpha ** 2 )) t132 = LOG ((( y - r3 ) * ( y + r2 )) / (( y + r3 ) * ( y - r2 ))) ter10 = t131 * t132 al4 = SQRT (( q2 ** 2 + y ** 2 ) * alpha ** 2 + sd ** 2 ) t141 = y * q2 t142 = alpha * ( 2 * sd ** 2 + alpha ** 2 * ( q2 ** 2 + y ** 2 )) t143 = al4 * ( y ** 2 * alpha ** 2 + sd ** 2 ) * ( q2 ** 2 * alpha ** 2 + sd ** 2 ) t144 = al5 * ( alpha * r3 * al4 + al4 ** 2 - sd * al6 ) t145 = al6 * ( alpha * r2 * al4 + al4 ** 2 - sd * al5 ) ter11 = (( t141 * t142 ) / ( t143 )) * LOG ( t144 / t145 ) g = ter1 + ter2 - ter3 - ter4 + ter5 + ter6 + ter7 + ter8 - ter9 - ter10 - ter11 gr3dprm = dc * g end function gr3dprm","tags":"","loc":"proc/gr3dprm.html"},{"title":"funcpdf – gravmod3d","text":"public subroutine funcpdf(ista, iend, n, m, sd, alpha, dx, dy, z, xprm, yprm, xrec, yrec, f, pl_opt) Compute the field (f array) for all ('m') or some (ista:iend) points in the xy plane, \nas the sum of the contributions of 'n' rectangular prisms Arguments Type Intent Optional Attributes Name integer :: ista integer :: iend integer :: n integer :: m real(kind=dp) :: sd real(kind=dp) :: alpha real(kind=dp) :: dx real(kind=dp) :: dy real(kind=dp), dimension (n) :: z real(kind=dp), dimension (n) :: xprm real(kind=dp), dimension (n) :: yprm real(kind=dp), dimension (m) :: xrec real(kind=dp), dimension (m) :: yrec real(kind=dp), dimension (m) :: f character(len=5), optional :: pl_opt Contents Source Code funcpdf Source Code subroutine funcpdf ( ista , iend , n , m , sd , alpha , dx , dy , & z , xprm , yprm , xrec , yrec , f , pl_opt ) !$ use omp_lib implicit none integer :: n , m real ( dp ), dimension ( n ) :: xprm , yprm , z real ( dp ), dimension ( m ) :: xrec , yrec , f real ( dp ) :: dx , dy , sd , alpha , soma real ( dp ) :: dxby2 , dyby2 , x , y , zi , y1 , y2 , dg !$ real(dp) :: t1, t2 character ( len = 5 ) :: loop character ( len = 5 ), optional :: pl_opt integer :: i , j , ista , iend f ( ista : iend ) = 0._dp dxby2 = dx / 2.0 dyby2 = dy / 2.0 loop = 'outer' if ( present ( pl_opt )) loop = pl_opt if ( loop . ne . 'outer' ) then !$ t1 = omp_get_wtime() do i = ista , iend soma = 0._dp !$OMP PARALLEL PRIVATE(j,y,y1,y2,x,zi,dg) !$OMP DO REDUCTION(+:soma) schedule (runtime) do j = 1 , n y = yprm ( j ) - yrec ( i ) y1 = dyby2 + y y2 = dyby2 - y x = xprm ( j ) - xrec ( i ) zi = z ( j ) dg = gr3dprm ( x , dxby2 , y1 , zi , sd , alpha ) dg = 0.5 * ( dg + gr3dprm ( x , dxby2 , y2 , zi , sd , alpha )) soma = soma + dg enddo !$OMP END DO NOWAIT !$OMP END PARALLEL f ( i ) = soma enddo !$ t2 = omp_get_wtime() else !$ t1 = omp_get_wtime() !$OMP PARALLEL PRIVATE(i,j,y,y1,y2,x,zi,dg) !$OMP DO do i = ista , iend do j = 1 , n y = yprm ( j ) - yrec ( i ) y1 = dyby2 + y y2 = dyby2 - y x = xprm ( j ) - xrec ( i ) zi = z ( j ) dg = gr3dprm ( x , dxby2 , y1 , zi , sd , alpha ) dg = 0.5 * ( dg + gr3dprm ( x , dxby2 , y2 , zi , sd , alpha )) f ( i ) = f ( i ) + dg enddo enddo !$OMP END DO NOWAIT !$OMP END PARALLEL !$ t2 = omp_get_wtime() endif !$ print*, \"Forward modeling took\", t2-t1, \"seconds\" end subroutine funcpdf","tags":"","loc":"proc/funcpdf.html"},{"title":"grav_kinds – gravmod3d","text":"Numeric kinds for modeling of gravity anomalies. Uses iso_fortran_env Contents Variables dp sp Variables Type Visibility Attributes Name Initial integer, public, parameter :: dp = real64 integer, public, parameter :: sp = real32","tags":"","loc":"module/grav_kinds.html"},{"title":"grav3d_module – gravmod3d","text":"Computation of 3D gravity anomalies for arbitrary-shaped 3D bodies, which are\napproximated by rectangular prisms (blocks). It is considered that a parabolic\ndensity-contrast function can reasonably approximate the arbitrary \ndepth-dependent density contrast of geologic bodies (i.e. sedimentary basins) Uses grav_kinds Contents Functions gr3dprm Subroutines funcpdf Functions public function gr3dprm (x, t, y, z, sd, alpha) Computes the theoretical gravity anomaly of 3d rectangular/square block Read more… Arguments Type Intent Optional Attributes Name real(kind=dp) :: x real(kind=dp) :: t real(kind=dp) :: y real(kind=dp) :: z real(kind=dp) :: sd real(kind=dp) :: alpha Return Value real(kind=dp) Subroutines public subroutine funcpdf (ista, iend, n, m, sd, alpha, dx, dy, z, xprm, yprm, xrec, yrec, f, pl_opt) Compute the field (f array) for all ('m') or some (ista:iend) points in the xy plane, \nas the sum of the contributions of 'n' rectangular prisms Arguments Type Intent Optional Attributes Name integer :: ista integer :: iend integer :: n integer :: m real(kind=dp) :: sd real(kind=dp) :: alpha real(kind=dp) :: dx real(kind=dp) :: dy real(kind=dp), dimension (n) :: z real(kind=dp), dimension (n) :: xprm real(kind=dp), dimension (n) :: yprm real(kind=dp), dimension (m) :: xrec real(kind=dp), dimension (m) :: yrec real(kind=dp), dimension (m) :: f character(len=5), optional :: pl_opt","tags":"","loc":"module/grav3d_module.html"},{"title":"grav_kinds.f90 – gravmod3d","text":"Contents Modules grav_kinds Source Code grav_kinds.f90 Source Code !******************************************************************************* !> !  Numeric kinds for modeling of gravity anomalies. module grav_kinds use iso_fortran_env , only : real32 , real64 ! precision kinds private integer , parameter , public :: dp = real64 integer , parameter , public :: sp = real32 end module grav_kinds !*******************************************************************************","tags":"","loc":"sourcefile/grav_kinds.f90.html"},{"title":"gr3dmod.f90 – gravmod3d","text":"Contents Modules grav3d_module Source Code gr3dmod.f90 Source Code !************************************************************************************ !> !  Computation of 3D gravity anomalies for arbitrary-shaped 3D bodies, which are !  approximated by rectangular prisms (blocks). It is considered that a parabolic !  density-contrast function can reasonably approximate the arbitrary !  depth-dependent density contrast of geologic bodies (i.e. sedimentary basins) module grav3d_module use grav_kinds implicit none private ! parameters real ( dp ), parameter :: tog = 1 3.3486_dp real ( dp ), parameter :: z1 = 1e-6 public funcpdf , gr3dprm contains !************************************************************************************ !> !  Computes the theoretical gravity anomaly of 3d rectangular/square block ! !### References !  * Chakravarthi, V., H. M. Raghuram, and S. B. Singh, 2002, 3-D forward !    gravity modeling of basement interfaces above which the density contrast !    varies continuously with depth: Computers & Geosciences, 28, 53–57, !    doi: 10.1016/S0098-3004(01)00080-2. real ( dp ) function gr3dprm ( x , t , y , z , sd , alpha ) implicit none real ( dp ) :: x , t , y , z , sd , alpha real ( dp ) :: g , dc , z2 , al4 , al5 , al6 , al8 , q1 , q2 , r1 , r2 , r3 , r4 real ( dp ) :: t1 , t2 , t3 , t4 , t5 , tt2 , ttr1 , ttr2 real ( dp ) :: ter1 , ter2 , ter3 , ter4 , ter5 real ( dp ) :: ter6 , ter7 , ter8 , ter9 , ter10 , ter11 real ( dp ) :: t41 , t42 , t51 , t52 , t61 , t62 real ( dp ) :: t71 , t72 , t81 , t82 , t91 , t92 , t101 , t102 real ( dp ) :: t111 , t112 , t122 , t131 , t132 real ( dp ) :: t141 , t142 , t143 , t144 , t145 dc = tog * sd ** 3 if ( z . eq . 0._dp ) then z2 = 1 1e-7 else z2 = z endif al5 = sd - alpha * z1 al6 = sd - alpha * z2 q1 = x + t q2 = x - t r1 = SQRT ( q1 ** 2 + y ** 2 + z1 ** 2 ) r2 = SQRT ( q2 ** 2 + y ** 2 + z1 ** 2 ) r3 = SQRT ( q2 ** 2 + y ** 2 + z2 ** 2 ) r4 = SQRT ( q1 ** 2 + y ** 2 + z2 ** 2 ) t1 = 1 / alpha t2 = ( ATAN (( y * q1 ) / ( z2 * r4 ))) / al6 - ( ATAN (( y * q1 ) / ( z1 * r1 ))) / al5 ttr1 = t1 * t2 tt2 = ( ATAN (( y * q2 ) / ( z2 * r3 ))) / al6 - ( ATAN (( y * q2 ) / ( z1 * r2 ))) / al5 ttr2 = t1 * tt2 ter1 = ttr1 - ttr2 t3 = y * q1 al8 = SQRT (( q1 ** 2 + y ** 2 ) * alpha ** 2 + sd ** 2 ) t41 = alpha * ( 2 * sd ** 2 + alpha ** 2 * ( q1 ** 2 + y ** 2 )) t42 = al8 * ( y ** 2 * alpha ** 2 + sd ** 2 ) * ( q1 ** 2 * alpha ** 2 + sd ** 2 ) t4 = t41 / t42 t51 = al5 * ( alpha * r4 * al8 + al8 ** 2 - sd * al6 ) t52 = al6 * ( alpha * r1 * al8 + al8 ** 2 - sd * al5 ) t5 = LOG ( t51 / t52 ) ter2 = t3 * t4 * t5 t61 = sd / ( alpha * ( sd ** 2 + y ** 2 * alpha ** 2 )) t62 = ATAN (( y * r4 ) / ( z2 * q1 )) - ATAN (( y * r1 ) / ( z1 * q1 )) ter3 = t61 * t62 t71 = sd / ( alpha * ( sd ** 2 + q1 ** 2 * alpha ** 2 )) t72 = ATAN (( q1 * r4 ) / ( z2 * y )) - ATAN (( q1 * r1 ) / ( z1 * y )) ter4 = t71 * t72 t81 = y / ( 2 * ( sd ** 2 + y ** 2 * alpha ** 2 )) t82 = LOG ((( q1 - r4 ) * ( q1 + r1 )) / (( q1 + r4 ) * ( q1 - r1 ))) ter5 = t81 * t82 t91 = q1 / ( 2 * ( sd ** 2 + q1 ** 2 * alpha ** 2 )) t92 = LOG ((( y - r4 ) * ( y + r1 )) / (( y + r4 ) * ( y - r1 ))) ter6 = t91 * t92 t101 = sd / ( alpha * ( sd ** 2 + y ** 2 * alpha ** 2 )) t102 = ATAN (( y * r3 ) / ( z2 * q2 )) - ATAN (( y * r2 ) / ( z1 * q2 )) ter7 = t101 * t102 t111 = sd / ( alpha * ( sd ** 2 + q2 ** 2 * alpha ** 2 )) t112 = ATAN (( q2 * r3 ) / ( z2 * y )) - ATAN (( q2 * r2 ) / ( z1 * y )) ter8 = t111 * t112 t122 = LOG ((( q2 - r3 ) * ( q2 + r2 )) / (( q2 + r3 ) * ( q2 - r2 ))) ter9 = t81 * t122 t131 = q2 / ( 2 * ( sd ** 2 + q2 ** 2 * alpha ** 2 )) t132 = LOG ((( y - r3 ) * ( y + r2 )) / (( y + r3 ) * ( y - r2 ))) ter10 = t131 * t132 al4 = SQRT (( q2 ** 2 + y ** 2 ) * alpha ** 2 + sd ** 2 ) t141 = y * q2 t142 = alpha * ( 2 * sd ** 2 + alpha ** 2 * ( q2 ** 2 + y ** 2 )) t143 = al4 * ( y ** 2 * alpha ** 2 + sd ** 2 ) * ( q2 ** 2 * alpha ** 2 + sd ** 2 ) t144 = al5 * ( alpha * r3 * al4 + al4 ** 2 - sd * al6 ) t145 = al6 * ( alpha * r2 * al4 + al4 ** 2 - sd * al5 ) ter11 = (( t141 * t142 ) / ( t143 )) * LOG ( t144 / t145 ) g = ter1 + ter2 - ter3 - ter4 + ter5 + ter6 + ter7 + ter8 - ter9 - ter10 - ter11 gr3dprm = dc * g end function gr3dprm !************************************************************************************ !> !  Compute the field (f array) for all ('m') or some (ista:iend) points in the xy plane, !  as the sum of the contributions of 'n' rectangular prisms subroutine funcpdf ( ista , iend , n , m , sd , alpha , dx , dy , & z , xprm , yprm , xrec , yrec , f , pl_opt ) !$ use omp_lib implicit none integer :: n , m real ( dp ), dimension ( n ) :: xprm , yprm , z real ( dp ), dimension ( m ) :: xrec , yrec , f real ( dp ) :: dx , dy , sd , alpha , soma real ( dp ) :: dxby2 , dyby2 , x , y , zi , y1 , y2 , dg !$ real(dp) :: t1, t2 character ( len = 5 ) :: loop character ( len = 5 ), optional :: pl_opt integer :: i , j , ista , iend f ( ista : iend ) = 0._dp dxby2 = dx / 2.0 dyby2 = dy / 2.0 loop = 'outer' if ( present ( pl_opt )) loop = pl_opt if ( loop . ne . 'outer' ) then !$ t1 = omp_get_wtime() do i = ista , iend soma = 0._dp !$OMP PARALLEL PRIVATE(j,y,y1,y2,x,zi,dg) !$OMP DO REDUCTION(+:soma) schedule (runtime) do j = 1 , n y = yprm ( j ) - yrec ( i ) y1 = dyby2 + y y2 = dyby2 - y x = xprm ( j ) - xrec ( i ) zi = z ( j ) dg = gr3dprm ( x , dxby2 , y1 , zi , sd , alpha ) dg = 0.5 * ( dg + gr3dprm ( x , dxby2 , y2 , zi , sd , alpha )) soma = soma + dg enddo !$OMP END DO NOWAIT !$OMP END PARALLEL f ( i ) = soma enddo !$ t2 = omp_get_wtime() else !$ t1 = omp_get_wtime() !$OMP PARALLEL PRIVATE(i,j,y,y1,y2,x,zi,dg) !$OMP DO do i = ista , iend do j = 1 , n y = yprm ( j ) - yrec ( i ) y1 = dyby2 + y y2 = dyby2 - y x = xprm ( j ) - xrec ( i ) zi = z ( j ) dg = gr3dprm ( x , dxby2 , y1 , zi , sd , alpha ) dg = 0.5 * ( dg + gr3dprm ( x , dxby2 , y2 , zi , sd , alpha )) f ( i ) = f ( i ) + dg enddo enddo !$OMP END DO NOWAIT !$OMP END PARALLEL !$ t2 = omp_get_wtime() endif !$ print*, \"Forward modeling took\", t2-t1, \"seconds\" end subroutine funcpdf end module grav3d_module !************************************************************************************","tags":"","loc":"sourcefile/gr3dmod.f90.html"}]}