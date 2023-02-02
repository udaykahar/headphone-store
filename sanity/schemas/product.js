export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            Options: {
                hotspot: true,
            }
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price in cents',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
    ]
}