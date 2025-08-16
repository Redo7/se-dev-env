const useSoftDelete = async (overlayName: string, overlayID: string, widgetName: string | undefined, widgetID: string | undefined) => {
    const response = await fetch('/api/soft-delete', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overlayName, overlayID, widgetName, widgetID }),
    });
    if (!response.ok) {
        const element = widgetID ? widgetID : overlayID
        throw new Error(`Something went wrong while soft deleting ${element}`);
    }
    return response.ok
}

export default useSoftDelete;