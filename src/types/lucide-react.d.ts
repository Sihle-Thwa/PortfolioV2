declare module "lucide-react" {
	export * from "lucide-react/dist/lucide-react"
}
declare module "*.css" {
	const styles: { [className: string]: string }
	export default styles
}
