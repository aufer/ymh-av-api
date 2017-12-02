

declare module 'av-ctrl-api' {
    import { Promise } from 'es6-promise';
    
    export class AvCtrl {
        constructor();

        config: AvConfig;
        getStatus: () => any;
        setVolume: (vol: any) => void;
        setVolumeUp: () => void;
        setVolumeDown: () => void;
        powerOff: () => void;
        powerOn: () => void;
    }

    export interface AvConfig {
        setHost: (host: string) => any;
        setPort: (port: string) => any;
    }
}
