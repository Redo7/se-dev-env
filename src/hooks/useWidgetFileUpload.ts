import axios from "axios";
import { toast } from "sonner";

const useWidgetFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement | null> , overlay: string, widget: string, name: string, handleFileChange: (newValue: string) => void) => {
    if (event.target.files?.length) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('data', JSON.stringify({overlayID: overlay, widgetID: widget, fieldName: name}));

        try {
            if(!ref.current) return;
            const res = await axios.post(`/api/widget-asset-upload/`, formData);
            ref.current.value = '';
            const filePath = res.data.path.split("/overlays/");
            handleFileChange("/overlays/" + filePath[1]);
            toast.success(`${file.name} uploaded successfully`);
        } catch(error) {
            toast.error(`Error`, {description: `${error}`});
        }
    }
}

export default useWidgetFileUpload;