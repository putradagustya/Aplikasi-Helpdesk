import IconSocial from "@/components/ui/icon-social";
import Copyright from "@/components/ui/copyright";

export default function Footer() {
    return (
        <>
            <div className="m-auto py-20 px-3 w-full max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="flex flex-col gap-5 max-w-xl">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-xl md:text-2xl uppercase">Tentang Kami</h1>

                            <p className="text-sm">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui architecto iste praesentium unde tempore. 
                                Eveniet a accusamus repellat beatae id!
                            </p>
                        </div>

                        <div><IconSocial /></div>
                    </div>

                    <div className="flex items-center justify-center">
                        <a href="https://unpam.ac.id/"><img src="assets/image/logo.png" className="min-w-15 max-w-15 md:min-w-20 md:max-w-20 object-contain" /></a>
                    </div>
                </div>
            </div>
            
            <div className="border-t"><Copyright /></div>
        </>
    );
}
