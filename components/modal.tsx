import { Contact, ContactData } from "@/app/page";
import { FormEvent, useState } from "react";

interface ModalProps {
  handleCloseModal: () => void
  updateContact: (key: string, contact: ContactData) => void
  contactToEdit: Contact
}

export default function Modal({ handleCloseModal, updateContact, contactToEdit}: ModalProps) {
  const [nameModal, setNameModal] = useState(contactToEdit.name)
  const [emailModal, setEmailModal] = useState(contactToEdit.email)
  const [phoneModal, setPhoneModal] = useState(contactToEdit.phone)
  const [notesModal, setNotesModal] = useState(contactToEdit.notes)

  function handleUpdateContact(e: FormEvent) {
    console.log(e)
    e.preventDefault()
    const newData = {
      'name': nameModal,
      'email': emailModal,
      'phone': phoneModal,
      'notes': notesModal
    }
    updateContact(contactToEdit.key, newData)
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}>
      <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div 
            className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4" 
            onClick={(e) => {
              e.stopPropagation();
            }}>
            
          <form 
            action="" 
            className="flex flex-col items-center"
            onSubmit ={(e) => handleUpdateContact(e)}
          >
            <input 
              className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
              type="text" 
              placeholder="Nome"
              max={10}
              value={nameModal}
              required
              onChange={(e) => setNameModal(e.target.value)}
            />

            <input 
              className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
              type="email"
              placeholder="Email"
              value={emailModal}
              onChange={(e) => setEmailModal(e.target.value)}
            />
            
            <input 
              className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
              type="tel" 
              placeholder="Telefone"
              value={phoneModal}
              required
              onChange={(e) => setPhoneModal(e.target.value)}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/\D/g, '')
                  .replace(/(\d{2})(\d{1})/, '($1) $2')
                  .replace(/(\d{4})(\d{1})/, '$1-$2')
                  .replace(/(\d{4})-(\d{1})(\d{4})/, '$1$2-$3')
                  .replace(/(-\d{4})\d+?$/, '$1')
                }
              }
            />

            <textarea 
              className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md resize-none"
              placeholder="observação"
              value={notesModal}
              onChange={(e) => setNotesModal(e.target.value)}
            >

            </textarea>

            <div className='flex gap-4 items-center'>
              <button 
                className="p-3 bg-green-400 border-none rounded-lg cursor-pointer transition-[filter] duration-200 ease-linear hover:brightness-90" 
                type="submit"
              >
                Atualizar
              </button>

              <button 
                className="p-3 bg-red-400 border-none rounded-lg cursor-pointer transition-[filter] duration-200 ease-linear hover:brightness-90" 
                type="button"
                onClick={handleCloseModal}
              >
                Fechar
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}