import bbox from "@turf/bbox";
import {
  MultiPolygon as geoMultiPolygon,
  Polygon as geoPolygon,
} from "geojson";
import {
  FeatureGroup as FeatureGroupType,
  LatLngTuple,
  Layer,
  Polygon,
} from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { FeatureGroup, GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export type AreaFieldProps = {
  value: geoPolygon | geoMultiPolygon;
  onChange?: (value: geoPolygon | geoMultiPolygon) => void;
};

type DrawCreatedEvent = {
  layerType: string;
  layer: Polygon;
};

type EditableFeatureGroup = FeatureGroupType & {
  _layers: { [key: string]: Layer };
};

// พื้นที่รับผิดชอบ
export default function AreaField({ value, onChange }: AreaFieldProps) {
  const editableFG = useRef<EditableFeatureGroup>({} as any);
  console.log("area", value);

  const bboxArray = bbox(value);
  // normallay coordinate in leaflet in in [lat, lng] format
  // but goejson is in [lng, lat]
  // that come to 2 following lines
  const corner1 = [bboxArray[1], bboxArray[0]] as LatLngTuple;
  const corner2 = [bboxArray[3], bboxArray[2]] as LatLngTuple;

  const onCreateArea = (e: DrawCreatedEvent) => {
    const type = e.layerType;
    const layer = e.layer;
    console.log("create", type, layer);
    console.log("element", editableFG.current);

    const drawnItems = editableFG.current._layers;
    console.log(drawnItems);

    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        editableFG.current.removeLayer(layer);
      });
      console.log(drawnItems);
    }

    const geoJson = layer.toGeoJSON();
    onChange && onChange(geoJson.geometry);
  };

  return (
    <MapContainer
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%" }}
      bounds={[corner1, corner2]}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup ref={editableFG}>
        <EditControl
          position="topright"
          onCreated={onCreateArea}
          edit={{ remove: false, edit: false }}
          draw={{
            rectangle: false,
            marker: false,
            circlemarker: false,
            polyline: false,
            circle: false,
            polygon: true,
          }}
        />
        <GeoJSON data={value} />
      </FeatureGroup>
    </MapContainer>
  );
}
