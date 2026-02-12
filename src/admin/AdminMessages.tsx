import { useEffect, useState } from 'react';
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../config/supabase';
import type { Message } from '../types';
import AdminSidebar from './AdminSidebar';
import './AdminProjects.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('messages').update({ is_read: !currentStatus }).eq('id', id);
    if (error) toast.error('Failed to update');
    else {
      toast.success('Status updated');
      fetchMessages();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) toast.error('Failed to delete');
      else {
        toast.success('Deleted successfully');
        fetchMessages();
      }
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Contact Messages</h1>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} style={{ opacity: msg.is_read ? 0.6 : 1 }}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message.substring(0, 50)}...</td>
                  <td>
                    <button
                      className={msg.is_read ? 'btn-edit' : 'btn-primary'}
                      onClick={() => toggleRead(msg.id, msg.is_read)}
                    >
                      {msg.is_read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                    </button>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(msg.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
