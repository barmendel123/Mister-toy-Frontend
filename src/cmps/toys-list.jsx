import { ToysPreview } from "./toys-preview";


export function ToysList({toys, onRemoveToy}) {
    // console.log('toys', toys);
    return (
       
        <div className='robot-list simple-cards-grid'>
            {toys.map(toy => <ToysPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />)}
        </div>
    )
}