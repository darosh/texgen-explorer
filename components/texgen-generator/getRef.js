export function getRef($ref, schema) {
    let parts = $ref.slice(2).split('/');
    let x = schema;

    parts.forEach((part) => {
        x = x[part];
    });

    return x;
}
