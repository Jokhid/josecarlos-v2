import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  setDoc, 
  getDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  googleSignIn, 
  logout, 
  initAuth, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { Lead, AppConfig } from '../types';
import { 
  FileSpreadsheet, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  Archive, 
  Clock, 
  Search, 
  X, 
  ExternalLink,
  ChevronDown,
  Lock,
  LogOut,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState<boolean>(false);

  // Initialize auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        checkAdminStatus(currentUser);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsAuthorizedAdmin(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const checkAdminStatus = (currentUser: any) => {
    if (currentUser?.email === 'Hidalgo.J.Carlos@gmail.com' || currentUser?.email?.toLowerCase() === 'hidalgo.j.carlos@gmail.com') {
      setIsAuthorizedAdmin(true);
      fetchAdminData();
    } else {
      setIsAuthorizedAdmin(false);
      setErr(`Usuario ${currentUser?.email} no está autorizado como administrador.`);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErr(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        if (result.user.email === 'Hidalgo.J.Carlos@gmail.com' || result.user.email?.toLowerCase() === 'hidalgo.j.carlos@gmail.com') {
          setIsAuthorizedAdmin(true);
          // Fetch leads & sheet configuration
          setLoading(false);
          await fetchAdminData();
        } else {
          setIsAuthorizedAdmin(false);
          setErr(`Usuario ${result.user.email} no está autorizado como administrador.`);
          setLoading(false);
        }
      }
    } catch (e: any) {
      console.error(e);
      setErr('Error al iniciar sesión con Google.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setToken(null);
      setIsAuthorizedAdmin(false);
      setLeads([]);
      setConfig(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    setErr(null);
    try {
      // Fetch Leads
      const leadsPath = 'leads';
      const qLeads = query(collection(db, leadsPath), orderBy('createdAt', 'desc'));
      const qSnapshot = await getDocs(qLeads);
      const fetchedLeads = qSnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        let formattedDate = '';
        if (data.createdAt) {
          if (typeof data.createdAt.toDate === 'function') {
            formattedDate = data.createdAt.toDate().toLocaleString('es-ES');
          } else {
            formattedDate = new Date(data.createdAt).toLocaleString('es-ES');
          }
        }
        return {
          id: docSnap.id,
          ...data,
          createdAtFormatted: formattedDate
        } as unknown as Lead & { createdAtFormatted: string };
      });
      setLeads(fetchedLeads);

      // Fetch google configs
      const configSnap = await getDoc(doc(db, 'config', 'sheets'));
      if (configSnap.exists()) {
        const sheetConfig = configSnap.data();
        setConfig(sheetConfig);
        
        // Auto-sincronizar silenciosamente al cargar con los leads cargados
        if (sheetConfig.spreadsheetId && token) {
          setTimeout(() => {
            syncAllLeads(sheetConfig.spreadsheetId, true, fetchedLeads);
          }, 100);
        }
      }
    } catch (error) {
      console.error(error);
      setErr('Error al cargar datos desde Firestore. Asegúrate de iniciar sesión con Hidalgo.J.Carlos@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  // Status updates
  const handleUpdateStatus = async (leadId: string, newStatus: 'new' | 'contacted' | 'archived') => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
      setLeads(prevLeads => prevLeads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el estado del lead.');
    }
  };

  // Deletion
  const handleDeleteLead = async (leadId: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${name}? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el lead.');
    }
  };

  // Google Sheets Integration Direct Actions
  const handleCreateSheet = async () => {
    if (!token) return;
    setSyncing(true);
    setErr(null);
    try {
      // 1. Create spreadsheet in user's Drive via Sheets API
      const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            title: 'Contactos y Prospecciones - José Carlos Hidalgo'
          }
        })
      });

      if (!res.ok) {
        throw new Error('No se pudo crear el archivo de Google Sheets. Verifica permisos.');
      }

      const sheetData = await res.json();
      const spreadsheetId = sheetData.spreadsheetId;
      const spreadsheetUrl = sheetData.spreadsheetUrl;

      // 2. Write headers to Sheet1
      const writeHeadersRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:G1?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values: [['Fecha', 'Nombre Completo', 'Teléfono', 'Email', 'Servicio Solicitado', 'Mensaje/Consulta', 'Estado de Gestión']]
          })
        }
      );

      if (!writeHeadersRes.ok) {
        throw new Error('No se pudieron configurar los encabezados del documento.');
      }

      // 3. Save to Firestore Config
      await setDoc(doc(db, 'config', 'sheets'), {
        spreadsheetId,
        spreadsheetUrl,
        updatedAt: new Date().toISOString()
      });

      setConfig({
        spreadsheetId,
        spreadsheetUrl,
        updatedAt: new Date().toISOString()
      });

      // Sync data immediately
      await syncAllLeads(spreadsheetId);

    } catch (e: any) {
      console.error(e);
      setErr(e.message || 'Error al conectar con Google Sheets.');
    } finally {
      setSyncing(false);
    }
  };

  const syncAllLeads = async (targetSpreadsheetId?: string, silent: boolean = false, overrideLeads?: Lead[]) => {
    const sId = targetSpreadsheetId || config?.spreadsheetId;
    if (!sId || !token) {
      if (!silent) setErr('No hay ninguna hoja conectada.');
      return;
    }
    const leadsToSync = overrideLeads || leads;
    if (leadsToSync.length === 0) return;

    setSyncing(true);
    setErr(null);
    try {
      // Prepare leads array for Sheets
      const values = [
        ['Fecha', 'Nombre Completo', 'Teléfono', 'Email', 'Servicio Solicitado', 'Mensaje/Consulta', 'Estado de Gestión'],
        ...leadsToSync.map(lead => {
          let dateStr = '';
          if (lead.createdAt) {
            if (typeof lead.createdAt.toDate === 'function') {
              dateStr = lead.createdAt.toDate().toLocaleString('es-ES');
            } else {
              dateStr = new Date(lead.createdAt).toLocaleString('es-ES');
            }
          }
          return [
            dateStr,
            lead.name,
            lead.phone,
            lead.email,
            lead.service,
            lead.message,
            lead.status === 'new' ? 'Nuevo' : lead.status === 'contacted' ? 'Contactado' : 'Archivado'
          ];
        })
      ];

      // Overwrite the values
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sId}/values/Sheet1!A1:G${values.length}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values })
        }
      );

      if (!res.ok) {
        throw new Error('Error al sincronizar datos con Google Sheets.');
      }

      // Update configuration update date in DB
      await updateDoc(doc(db, 'config', 'sheets'), {
        updatedAt: new Date().toISOString()
      });

      setConfig(prev => ({
        ...prev,
        updatedAt: new Date().toISOString()
      }));

      // Flash feedback
      if (!silent) {
        alert('Sincronización completada con éxito en Google Sheets.');
      }
    } catch (e: any) {
      console.error(e);
      if (!silent) {
        setErr(e.message || 'Error sincronizando la hoja de cálculo.');
      }
    } finally {
      setSyncing(false);
    }
  };

  // Filter and search
  const filteredLeads = leads.filter(lead => {
    const matchesFilter = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex flex-col w-full max-w-6xl h-[90vh] bg-white border border-neutral-200 rounded-lg shadow-2xl overflow-hidden animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-zinc-950 text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock className="text-orange-500 w-5 h-5" />
            <h2 className="text-lg font-bold uppercase tracking-wider">Panel de Administración de Leads</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        {!user ? (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center space-y-6">
            <div className="max-w-md space-y-3">
              <h3 className="text-2xl font-bold text-zinc-900">Acceso Restringido</h3>
              <p className="text-zinc-500 text-sm">
                Inicia sesión con la cuenta de Google autorizada (<strong>Hidalgo.J.Carlos@gmail.com</strong>) para gestionar propuestas, diagnosticar contactos y sincronizar la base de datos con tu Google Sheets.
              </p>
            </div>
            {err && (
              <div className="bg-red-50 text-red-700 text-xs px-4 py-2 border border-red-200 max-w-md w-full rounded">
                {err}
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase text-xs tracking-widest flex items-center gap-3 transition-all disabled:opacity-50 rounded-lg shadow-md border border-orange-600"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.745-.079-1.32-.174-1.885h-10.62z"/>
              </svg>
              {loading ? 'Cargando...' : 'Iniciar Sesión administrador'}
            </button>
          </div>
        ) : !isAuthorizedAdmin ? (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center space-y-6">
            <div className="max-w-md space-y-4">
              <h3 className="text-xl font-bold text-red-650">Usuario No Autorizado</h3>
              <p className="text-zinc-500 text-sm">
                Has iniciado sesión con <strong>{user.email}</strong>, pero esta cuenta de Google no tiene permisos de administrador. Por favor, cierra sesión e inicia con la cuenta <strong>Hidalgo.J.Carlos@gmail.com</strong>.
              </p>
              {err && <div className="p-2 border border-rose-200 bg-rose-50 text-rose-700 text-xs">{err}</div>}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-orange-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors rounded-lg shadow-sm border border-orange-600"
                >
                  Cerrar Sesión actual
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-zinc-300 text-zinc-700 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden bg-zinc-50">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-b border-zinc-200 px-6 py-4 gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  Usuario: <strong className="text-zinc-900">{user.email}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold uppercase tracking-widest"
                >
                  <LogOut className="w-3.5 h-3.5" /> Salir
                </button>
              </div>

              {/* Google Sheets Integration Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {config ? (
                  <>
                    <a
                      href={config.spreadsheetUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-4 py-2 border border-zinc-200 bg-white text-zinc-700 font-medium text-xs flex items-center gap-2 hover:bg-zinc-50 transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      Ver Google Sheet
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                    <button
                      onClick={() => syncAllLeads()}
                      disabled={syncing}
                      className="px-4 py-2 bg-orange-600 border border-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-orange-700 transition-colors disabled:opacity-50 rounded-lg shadow-sm"
                    >
                      <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                      Sincronizar Datos
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleCreateSheet}
                    disabled={syncing}
                    className="px-4 py-2 bg-orange-600 border border-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-orange-700 transition-all disabled:opacity-50 rounded-lg shadow-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    {syncing ? 'Creando Hoja...' : 'Vincular y Crear Google Sheet'}
                  </button>
                )}
                
                <button
                  onClick={fetchAdminData}
                  disabled={loading}
                  className="p-2 border border-zinc-200 hover:bg-zinc-100 transition-colors"
                  title="Refrescar leads"
                >
                  <RefreshCw className={`w-4 h-4 text-zinc-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Error / Feedback notification */}
            {err && (
              <div className="bg-red-50 text-red-700 px-6 py-2.5 border-b border-red-100 text-xs flex justify-between items-center font-medium">
                <span>{err}</span>
                <button onClick={() => setErr(null)} className="text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Dashboard Sub-Filter and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-white border-b border-zinc-200 gap-4">
              <div className="flex bg-zinc-100 p-1 gap-1 rounded-lg">
                {['all', 'new', 'contacted', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-md ${
                      statusFilter === status
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {status === 'all' && 'Todos'}
                    {status === 'new' && 'Nuevos'}
                    {status === 'contacted' && 'Contactados'}
                    {status === 'archived' && 'Archivados'}
                    <span className="ml-1 px-1.5 py-0.5 bg-zinc-200 text-zinc-800 text-[9px] rounded-full group-hover:bg-zinc-300 font-bold">
                      {status === 'all' 
                        ? leads.length 
                        : leads.filter(l => l.status === status).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar lead por nombre, mail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 bg-white"
                />
              </div>
            </div>

            {/* Leads Table Content */}
            <div className="flex-1 overflow-auto p-6">
              {loading && leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-zinc-355" />
                  <p className="text-xs uppercase tracking-wider">Cargando base de datos...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white border border-zinc-200 text-center text-zinc-400 space-y-2">
                  <Clock className="w-12 h-12 text-zinc-300" />
                  <h4 className="font-bold text-zinc-700 text-sm uppercase">Sin Registros Encontrados</h4>
                  <p className="text-xs max-w-sm">No hay consultas de clientes que coincidan con la búsqueda o el filtro de estado actual.</p>
                </div>
              ) : (
                <div className="bg-white border border-zinc-250 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 text-[10px] font-bold uppercase tracking-widest border-b border-zinc-200">
                        <th className="px-6 py-4">Fecha</th>
                        <th className="px-6 py-4">Cliente / Contacto</th>
                        <th className="px-6 py-4">Servicio solicitado</th>
                        <th className="px-6 py-4">Mensaje / Consulta</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                        <th className="px-6 py-4 text-right">Acciones de Gestión</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          className="hover:bg-zinc-50 transition-colors text-sm"
                        >
                          {/* Cell 1: Date */}
                          <td className="px-6 py-4 font-mono text-xs text-zinc-500 whitespace-nowrap">
                            {(lead as any).createdAtFormatted || new Date(lead.createdAt).toLocaleString()}
                          </td>

                          {/* Cell 2: Contact info */}
                          <td className="px-6 py-4">
                            <div className="font-bold text-zinc-900">{lead.name}</div>
                            <div className="flex flex-col gap-0.5 text-xs text-zinc-500 mt-1">
                              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-zinc-400" /> {lead.email}</span>
                              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-zinc-400" /> {lead.phone}</span>
                            </div>
                          </td>

                          {/* Cell 3: Service */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-50 text-orange-850 border border-orange-100 rounded">
                              <Briefcase className="w-3.5 h-3.5" />
                              {lead.service}
                            </span>
                          </td>

                          {/* Cell 4: Message */}
                          <td className="px-6 py-4 text-xs text-zinc-650 max-w-xs truncate" title={lead.message}>
                            {lead.message || <em className="text-zinc-400">Sin descripción adicional</em>}
                          </td>

                          {/* Cell 5: Status */}
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                              lead.status === 'new' 
                                ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                                : lead.status === 'contacted'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-zinc-200 text-zinc-700 border border-zinc-300'
                            }`}>
                              {lead.status === 'new' && 'NUEVO'}
                              {lead.status === 'contacted' && 'CONTACTADO'}
                              {lead.status === 'archived' && 'ARCHIVADO'}
                            </span>
                          </td>

                          {/* Cell 6: Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {lead.status !== 'contacted' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                                  className="p-2 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                                  title="Marcar como contactado"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {lead.status !== 'archived' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'archived')}
                                  className="p-2 border border-zinc-200 text-zinc-650 hover:bg-zinc-100 transition-colors"
                                  title="Archivar"
                                >
                                  <Archive className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteLead(lead.id, lead.name)}
                                className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Eliminar permanentemente"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
