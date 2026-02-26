import { useEffect } from 'react';

interface Props{
    overlay: any;
    widget: string;
    name: string;
    setInputValue: (value: any) => void;
    origin? : string;
}

export default function useFieldUpdates({ overlay, widget, name, setInputValue }: Props) {
  useEffect(() => {
    if (!import.meta.hot) return;
    
    const handler = async (data: any) => {
        if (data.widgetId === widget && data.field === name && data.origin === "setField") {
            setInputValue(data.newValue);
        }
    };

    import.meta.hot.on('field-data-updated', handler);
    return () => {
      import.meta.hot?.off('field-data-updated', handler);
    };
  }, [overlay, widget, name, setInputValue]);
}