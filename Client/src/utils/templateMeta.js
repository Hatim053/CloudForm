const fromInputElements = (elementsData) => (
    Array.isArray(elementsData?.inputElements)
        ? elementsData.inputElements
            .filter((element) => element?.id)
            .map((element) => ({ id : String(element.id) , name : element.name ?? element.type , label : element.label }))
        : []
);

const TEMPLATE_ELEMENTS = {
    cf001 : fromInputElements,
    sf001 : fromInputElements,
    wf001 : () => [{ id : "email" , name : "Email" , label : "Email" }],
    ic001 : () => [],
    ic002 : () => [],
    ic003 : () => []
};

const getTemplateElements = (templateId , elementsData) => (TEMPLATE_ELEMENTS[templateId] ?? fromInputElements)(elementsData);

export { getTemplateElements };