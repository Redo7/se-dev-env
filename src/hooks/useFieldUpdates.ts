import { useEffect } from 'react';
import useFieldData from './useFieldData';

interface Props{
    overlay: any;
    widget: string;
    name: string;
    setInputValue: (value: any) => void;
    origin? : string;
}

export default function useHotFieldData({ overlay, widget, name, setInputValue, origin = "" }: Props) {
  useEffect(() => {
    if (!import.meta.hot) return;

    const handler = async (data: any) => {
      if (data.widgetId === widget && origin === 'setField') {
        const fieldData = await useFieldData(overlay, widget);
        console.log(name, fieldData[name]);
        
        setInputValue(fieldData[name]);
      }
    };

    import.meta.hot.on('field-data-updated', handler);
    return () => {
      import.meta.hot?.off('field-data-updated', handler);
    };
  }, [overlay, widget, name, setInputValue]);
}