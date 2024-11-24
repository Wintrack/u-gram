import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";

export default function GenericPage({ children, titlePage, color }: Readonly<{ children: React.ReactNode; titlePage: string; color: color }>) {
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card placeholder="" className="bg-white/20">
                <CardHeader placeholder="" variant="gradient" color={color} className="mb-4 p-4 flex">
                    <Typography placeholder="" variant="h6" color="white">
                        {titlePage}
                    </Typography>
                </CardHeader>
                <CardBody placeholder="">{children}</CardBody>
            </Card>
        </div>
    );
}
