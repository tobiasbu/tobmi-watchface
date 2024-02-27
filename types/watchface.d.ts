

interface WatchFaceLifeCycle {
  onInit: () => void
  onDataRestore?: () => void
  build: () => void
  onDataSave?: () => void
  onDestroy: () => void
}

declare function WatchFace(options: WatchFaceLifeCycle): void;
