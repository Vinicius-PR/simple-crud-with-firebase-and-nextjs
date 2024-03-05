'use client'
import Modal from "@/components/modal";
// import Modal from "@/components/modalTalwind";
import { database } from "@/services/firebase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export type Contact =  {
  key: string,
  name: string,
  email: string,
  phone: string,
  notes: string
}

export type ContactData = {
  name: string,
  email: string,
  phone: string,
  notes: string
}

export default function Home() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchResult, setSearchResult] = useState<Contact[]>([])
  const [contactToEdit, setContactToEdit] = useState<Contact>({} as Contact)
  const [isSearching, setIsSearching] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)


  function reset() {
    setName('')
    setEmail('')
    setPhone('')
    setNotes('')
  }

  function save(event: FormEvent) {
    event.preventDefault()
    console.log('saving', name, email, phone, notes)
    const ref = database.ref('contatos')

    const data = {
      name,
      email,
      phone,
      notes
    }

    ref.push(data)
    reset()
  }

  function deleteContact(ref: string) {
    const reference = database.ref(`contatos/${ref}`).remove()
  }

  function searchData(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const word = target.value

    if (word.length > 0) {
      setIsSearching(true)
      const dataSearch = new Array
      contacts.map(contact => {
        const rule = new RegExp(word, 'gi')
        if (rule.test(contact.name)) {
          dataSearch.push(contact)
        }
      })
      setSearchResult(dataSearch)
    } else {
      setIsSearching(false)
    }
  }

  function editData(contact: Contact) {
    setContactToEdit(contact)
    setIsModalOpen(true)
  }

  function updateContact(key: string, contact: ContactData) {
    const ref = database.ref('contatos/')
    ref.child(key).update(contact)
    setIsModalOpen(false)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const refContacts = database.ref('contatos')

    refContacts.on('value', result => {
      const resultContacts = Object.entries<Contact>(result.val() ?? {}).map(([key, value]) => {
        return {
          'key': key,
          'name': value.name,
          'email': value.email,
          'phone': value.phone,
          'notes': value.notes
        }
      })
      setContacts(resultContacts)
    })
  }, [])

  return (
    <>
      <main className="flex justify-center items-center h-lvh">
        <form action="" className="w-[500px] mr-4 text-center" onSubmit={save}>
          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="text" 
            placeholder="Nome (OBRIGATORIO)"
            max={10}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="tel" 
            placeholder="Telefone (OBRIGATORIO) "
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>

          <button 
            className="p-3 w-5/12 bg-green-400 border-none rounded-lg cursor-pointer transition-[filter] duration-200 ease-linear hover:brightness-90" 
            type="submit"
          >
            Salvar
          </button>          
        </form>
        
        <div className="w-[500px] p-4 bg-green-200 h-[500px] text-center rounded-xl ml-20 overflow-auto">
          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="text" 
            placeholder="Buscar"
            onChange={searchData}
          />
          {/* Contacts */}
          {
            isSearching ? (
              searchResult.map((contact) => {
                return (
                  <div key={contact.key} className="bg-green-100 rounded-lg text-left h-fit box-content p-3 mb-4">
                    <div className="flex justify-between items-center ">
                      <p className="text-2xl px-0.5 py-4 font-bold max-w-5xl">{contact.name}</p>
                      <div className="flex gap-3">
                        <button 
                          className="text-red-800 cursor-pointer hover:text-shadow-bold"
                          onClick={() => editData(contact)}
                          >
                          Editar
                        </button>
                        <button 
                          className="text-red-800 cursor-pointer hover:text-shadow-bold"  
                          onClick={() => {deleteContact(contact.key)}}
                          >
                            Excluir
                        </button>
                      </div>
                    </div>
  
                    <div className="">
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                      <p>{contact.notes}</p>
                    </div>
  
                  </div>
                )
              })
            ) : (
              contacts.map((contact) => {
                return (
                  <div key={contact.key} className="bg-green-100 rounded-lg text-left h-fit box-content p-3 mb-4">
                    <div className="flex justify-between items-center ">
                      <p className="text-2xl px-0.5 py-4 font-bold max-w-5xl">{contact.name}</p>
                      <div className="flex gap-3">
                        <button 
                          className="text-red-800 cursor-pointer hover:text-shadow-bold"
                          onClick={() => editData(contact)}
                          >
                          Editar
                        </button>
                        <button 
                          className="text-red-800 cursor-pointer hover:text-shadow-bold"  
                          onClick={() => {deleteContact(contact.key)}}
                          >
                            Excluir
                        </button>
                      </div>
                    </div>
  
                    <div className="">
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                      <p>{contact.notes}</p>
                    </div>
  
                  </div>
                )
              })
            )
          }

        </div>
        {
          isModalOpen && <Modal handleCloseModal={handleCloseModal} contactToEdit={contactToEdit} updateContact={updateContact}/>
        }
      </main>
    </>
  );
}
