#!/bin/sh

gmt begin true
	gmt set PS_CHAR_ENCODING = ISOLatin1+
	gmt set FONT_ANNOT_PRIMARY=10    
	gmt set FONT_LABEL=10
	gmt set COLOR_NAN=200/215/137
	gmt set PS_PAGE_ORIENTATION=PORTRAIT
	gmt set FORMAT_FLOAT_OUT=%.12lg
	gmt set MAP_ANNOT_ORTHO=NE

	gmt basemap -R0/40.5/0/73.5 -JX6.75/12.25 -Bx5 -By5 -Bwesn -p145/45 -X4 -Y15
	awk '{print $1, $2, $3=$3*-1}' ../synthetic_xyz.dat | gmt blockmean -I0.1/0.1 -R0/40.5/0/73.5  -V  > tmp.mybmean
	#gmt surface tmp.mybmean   -Gxyz.grd -I0.1/0.1 -R0/40.5/0/73.5 -T0.1 -V
	gmt triangulate tmp.mybmean  -Gxyz.grd  -I0.05/0.05 -R0/40.5/0/73.5 -V
	gmt grdfilter  xyz.grd  -Gfiltered.nc -D0 -Fc1
	gmt grdgradient filtered.nc  -Ne0.35 -A225 -Gfiltered_i.nc 
	gmt grdimage xyz.grd -Cmola.cpt -JX -E60/30 -R0/40.5/0/73.5 -p145/45
	gmt grdcontour filtered.nc -C0.25  -Wthinnest,black, -JX -p145/45
	echo "34 51 N" | gmt pstext -JX -p145/45 -F+f24p+jLM
	echo "33.5 52 \255" | gmt pstext -JX -p145/45 -F+f36p,Symbol+jLM 
	gmt grdview filtered.nc -JX6.75/12.25 -JZ3 -Cmola.cpt -Ifiltered_i.nc -p145/45 -R0/40.5/0/73.5/-5/0 -N-5 -Qi200 -Y-11 -Wc -V -B"x5+lHorizontal coordinate x (km)" -B"y5+lHorizontal coordinate y (km)" -B"z1+lDepth (km)" -BnESwZ
	gmt colorbar -Cmola.cpt -DJRM+o6c/7.5c+w8c/0.4c -Bx0.5 -By+lkm
gmt end show

rm -rf *.grd  
rm -rf *.mybmean 
rm -rf *.nc 
