export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation Header Skeleton */}
			<div className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="mr-2 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
							<div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
							<div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
						</div>
					</div>

					{/* Breadcrumb Skeleton */}
					<div className="mt-4 flex items-center space-x-2">
						<div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
						<div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
						<div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
						<div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
						<div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
					</div>
				</div>
			</div>

			{/* Main Content Skeleton */}
			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{/* Image Skeleton */}
					<div className="lg:col-span-1">
						<div className="overflow-hidden rounded-lg bg-white shadow-sm">
							<div className="aspect-square animate-pulse bg-gray-200"></div>
						</div>
					</div>

					{/* Product Details Skeleton */}
					<div className="lg:col-span-1">
						<div className="rounded-lg bg-white p-8 shadow-sm">
							<div className="space-y-6">
								{/* Title and Category */}
								<div>
									<div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
									<div className="mb-4 h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
									<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
								</div>

								{/* Variants */}
								<div>
									<div className="mb-3 h-5 w-1/4 animate-pulse rounded bg-gray-200"></div>
									<div className="flex space-x-2">
										<div className="h-10 w-16 animate-pulse rounded bg-gray-200"></div>
										<div className="h-10 w-16 animate-pulse rounded bg-gray-200"></div>
										<div className="h-10 w-16 animate-pulse rounded bg-gray-200"></div>
									</div>
								</div>

								{/* Add to Cart Button */}
								<div className="h-12 w-full animate-pulse rounded bg-gray-200"></div>

								{/* Trust Badges */}
								<div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
									{[1, 2, 3].map((i) => (
										<div key={i} className="text-center">
											<div className="mx-auto mb-2 h-6 w-6 animate-pulse rounded bg-gray-200"></div>
											<div className="mx-auto h-3 w-16 animate-pulse rounded bg-gray-200"></div>
										</div>
									))}
								</div>

								{/* Description */}
								<div className="border-t border-gray-200 pt-6">
									<div className="mb-3 h-5 w-1/4 animate-pulse rounded bg-gray-200"></div>
									<div className="space-y-2">
										<div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
										<div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
										<div className="h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Additional Information Skeleton */}
			<section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-3">
					{[1, 2, 3].map((i) => (
						<div key={i} className="rounded-lg bg-white p-6 shadow-sm">
							<div className="mb-4 h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
							<div className="space-y-2">
								{[1, 2, 3, 4].map((j) => (
									<div key={j} className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
