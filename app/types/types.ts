export interface Blog {
    sys: { id: string };
    title: string;
    subTitle: string;
    slug: string;
    date: string;
    description: string;
    image: { url: string };
};


export interface ParamsWithSlug {
    params: {slug: string}
};