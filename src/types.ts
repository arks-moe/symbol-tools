type Layer = {
  points: {
    topLeft: {
      x: number;
      y: number;
    };
    bottomLeft: {
      x: number;
      y: number;
    };
    topRight: {
      x: number;
      y: number;
    };
    bottomRight: {
      x: number;
      y: number;
    };
  };
  props: {
    visible: boolean;
    textureIndex: number;
    transparency: number;
    colorR: number;
    colorG: number;
    colorB: number;
    colorX: number;
    colorY: number;
    colorZ: number;
  };
};

export type SymbolArt = {
  name: string;
  authorId: number;
  layerCount: number;
  sizeHeight: number;
  sizeWidth: number;
  soundEffect: number;
  layers: Layer[];
};
