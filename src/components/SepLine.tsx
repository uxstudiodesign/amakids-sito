/** Banda tricolore teal/verde/ciano ripresa dal manifesto. */
export default function SepLine() {
  return (
    <div aria-hidden="true" className="flex h-1.5 w-full">
      <div className="flex-1 bg-teal-scuro" />
      <div className="flex-1 bg-verde" />
      <div className="flex-1 bg-teal-chiaro" />
    </div>
  )
}
