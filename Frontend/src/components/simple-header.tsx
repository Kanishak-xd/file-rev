import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function SimpleHeader() {
	const location = useLocation();
	const activeTab = location.pathname === '/admin' ? 'admin' : 'user';

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<Link to="/user" className="font-mono text-lg font-bold hover:cursor-pointer">
						File Review
					</Link>
				</div>
				<div className="flex items-center gap-2">
					<Link to="/user">
						<Button
							variant={activeTab === 'user' ? 'default' : 'outline'}
							className={activeTab === 'user' ? "bg-black text-white hover:cursor-pointer" : "bg-white text-black border-black border hover:cursor-pointer hover:scale-101 hover:shadow-xl"}
						>
							User
						</Button>
					</Link>
					<Link to="/admin">
						<Button
							variant={activeTab === 'admin' ? 'default' : 'outline'}
							className={activeTab === 'admin' ? "bg-black text-white hover:cursor-pointer" : "bg-white text-black border-black border hover:cursor-pointer hover:scale-101 hover:shadow-xl"}
						>
							Admin
						</Button>
					</Link>
				</div>
			</nav>
		</header>
	);
}
