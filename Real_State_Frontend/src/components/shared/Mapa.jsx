import axios from 'axios';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fromLatLng, geocode } from 'react-geocode';
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents, Marker } from 'react-leaflet';
import { useFetch } from '../../hooks/useFetch';
import { usePropiedades } from '../../store';


export const Mapa = ({ LatLng, isDragable }) => {

  const center = {
    lat: LatLng.lat,
    lng: LatLng.lng
  }
  const propiedad = usePropiedades(state => state.propiedad)
  const setPropiedad = usePropiedades(state => state.setPropiedad)

  const [address, setAddress] = useState(null);
  const [position, setPosition] = useState(center)
  // const [{ datos, isLoading }, setProperties] = useState({
  //   datos: {},
  //   isLoading: true
  // })
  
  const { lat, lng } = position
  useEffect(() => {
    const state = {
      ...propiedad,
      lat: lat,
      lng: lng
    }
    setPropiedad(state)

 
  }, [position])

  let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&zoom=18&addressdetails=1`
  const { data: datos, isLoading } = useFetch(url, {})


  useEffect(() => {

    if (datos) {
      const { country, state, city, road } = datos.address
      setAddress({ country, state, city, road })

      setPropiedad({
        ...propiedad,
        ...address
      })
    }
  }, [isLoading, datos])

  function LocationMarker() {

    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {

        setPosition(e.latlng)

        map.flyTo(e.latlng, map.getZoom())
      },
    })


  }

  function DraggableMarker() {
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    return (
      <Marker
        draggable={isDragable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span >
            {
              isDragable ?
                'Arrastre el marcador a la ubicacion de la propiedad'
                :
                `${propiedad.country ? propiedad.country : 'No country specified'}, ${propiedad.state ? propiedad.state : 'No state specified'}, ${propiedad.city ? propiedad.city : 'No city specified'}, ${propiedad.road ? propiedad.road : 'No road specified'}`
            }

          </span>
        </Popup>
      </Marker>
    )
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker />
      {
        isDragable ?
          <LocationMarker />
          :
          ''
      }
    </MapContainer>
  );
}