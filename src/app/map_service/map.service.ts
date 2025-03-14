import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';

@Injectable({
  providedIn: 'root',
})
export class MapService1 {
  private map!: Map;
  private vectorLayer!: VectorLayer;

  initializeMap(
    targetId: string,
    center: [number, number],
    zoom: number,
    mapUrl: string
  ): void {
    if (this.map) {
      return;
    }

    const vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({ source: vectorSource });

    this.map = new Map({
      view: new View({
        center,
        zoom:
          mapUrl === '../../../../assets/western/{z}/{x}/{y}.png' ? 10 : zoom,
        maxZoom:
          mapUrl === '../../../../assets/western/{z}/{x}/{y}.png'
            ? 14
            : undefined,
        minZoom:
          mapUrl === '../../../../assets/western/{z}/{x}/{y}.png'
            ? 8
            : undefined,
      }),

      layers: [
        new TileLayer({
          source: new XYZ({ url: mapUrl }),
        }),
        this.vectorLayer,
      ],
      target: targetId,
    });
  }

  destroyMap(): void {
    if (this.map) {
      this.map.setTarget(undefined);
      this.map = undefined as unknown as Map;
    }
  }

  updateMapLayer(url: string): void {
    if (!this.map) {
      return;
    }
    const tileLayer = this.map
      .getLayers()
      .getArray()
      .find((layer) => layer instanceof TileLayer) as TileLayer;
    if (tileLayer) {
      tileLayer.setSource(new XYZ({ url }));
    }
  }
}
