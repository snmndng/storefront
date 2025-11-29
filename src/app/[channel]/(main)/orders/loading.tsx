export default function OrdersLoading() {
	return (
		<div className="mx-auto max-w-7xl p-8">
			<div className="h-8 w-48 bg-neutral-200 rounded animate-pulse mb-8" />

			<div className="space-y-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="rounded-lg border border-neutral-200 bg-white p-6">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="space-y-2">
								<div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
								<div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
							</div>
							<div className="flex gap-4">
								<div className="h-4 w-20 bg-neutral-100 rounded animate-pulse" />
								<div className="h-6 w-24 bg-neutral-200 rounded animate-pulse" />
							</div>
						</div>
						<div className="mt-4 flex gap-4">
							{[1, 2].map((j) => (
								<div key={j} className="h-16 w-16 bg-neutral-100 rounded animate-pulse" />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
