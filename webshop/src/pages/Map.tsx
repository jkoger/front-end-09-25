import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Map() {
  return (
    <div>
      <MapContainer
        className="map"
        center={[59.438, 24.745]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.438, 24.745]}>
          <Popup>
            Vanalinna kontor. <br /> 10-19.
          </Popup>
        </Marker>

        <Marker position={[59.422, 24.794]}>
          <Popup>
            Ulemiste keskus. <br /> 10-22.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
