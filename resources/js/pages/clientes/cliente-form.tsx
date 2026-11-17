import { Category, Cliente } from "@/types";
import { useForm } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import InputError from '@/components/input-error';
import { FormEvent } from "react";
import { toast } from "sonner";

interface Props {
    cliente?: Cliente | null;
    onClose: () => void;
}

export default function ClienteForm({ cliente, onClose }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombre:         cliente?.nombre ?? '',
        direccion:      cliente?.direccion ?? '',
        provincia:      cliente?.provincia ?? '',
        codigo_postal:  cliente?.codigo_postal?.toString() ?? '0',
        telefono:       cliente?.telefono ?? '',
    });

    function submit(e: FormEvent){
        e.preventDefault();
        const opts = {
            forceFormData: true,
            onSuccess: () => {
                toast.success(cliente ? 'Cliente actualizado.' : 'Cliente creado.');
                reset();
                onClose();
            }
        };
        cliente ? put(`/clientes/${cliente.id}`, opts) : post('/clientes', opts);
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{cliente ? 'Editar Cliente' : 'Crear Cliente'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
                        <InputError message={errors.nombre} />
                    </div>

                    <div>
                        <Label htmlFor="direccion">Direccion</Label>
                        <Input id="direccion" value={data.direccion} onChange={e => setData('direccion', e.target.value)} />
                        <InputError message={errors.direccion} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="provincia">Provincia</Label>
                            <Input id="provincia" value={data.provincia} onChange={e => setData('provincia', e.target.value)} />
                            <InputError message={errors.provincia} />
                        </div>
                        <div>
                            <Label htmlFor="codigo_postal">Codigo Postal</Label>
                            <Input id="codigo_postal" type="number" min="0" value={data.codigo_postal}
                                onChange={e => setData('codigo_postal', e.target.value)} />
                            <InputError message={errors.codigo_postal} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="telefono">Telefono</Label>
                        <Input id="telefono" value={data.telefono}
                            onChange={e => setData('telefono', e.target.value)} />
                        <InputError message={errors.telefono} />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando…' : cliente ? 'Actualizar' : 'Crear'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
