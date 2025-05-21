import logo from "../../logos/logo.avif";

const Header = () => {
    return (
        <header className="border-b-2 border-darkBlue py-2">
            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center justify-center text-center md:flex-row md:items-center md:justify-start md:text-left">
                    {/* Logo */}
                    <div className="mr-3">
                        <img
                            src={logo}
                            alt="Window Butlers Logo"
                            className="h-20 w-auto"
                        />
                    </div>

                    {/* Brand Text */}
                    <div className="flex flex-col text-center md:text-left">
                        <p className="text-2xl font-bold text-darkBlue tracking-normal">
                            WINDOW BUTLERS
                        </p>
                        <p className="text-m text-darkBlue italic">More than window cleaning.</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
