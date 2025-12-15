import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingBag, Star, Home, BarChart3, Settings, Menu, X, Plus, Search, Edit2, Trash2 } from 'lucide-react';

const DashProApp = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@email.com', role: 'Usuario', status: 'Activo' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', role: 'Usuario', status: 'Inactivo' }
  ]);

  const [orders, setOrders] = useState([
    { id: '#1234', client: 'Juan Pérez', product: 'Laptop Pro', date: '2024-01-15', amount: '$1,299', status: 'Completado' },
    { id: '#1235', client: 'María García', product: 'Mouse Wireless', date: '2024-01-15', amount: '$49', status: 'Pendiente' },
    { id: '#1236', client: 'Carlos López', product: 'Teclado Mecánico', date: '2024-01-14', amount: '$129', status: 'Procesando' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Usuario',
    status: 'Activo'
  });

  const stats = [
    { label: 'Total Usuarios', value: users.length, change: '↑ 12.5%', icon: Users, color: 'blue', changeColor: 'text-green-500' },
    { label: 'Ingresos', value: '$45,678', change: '↑ 8.2%', icon: DollarSign, color: 'green', changeColor: 'text-green-500' },
    { label: 'Pedidos', value: orders.length, change: '↓ 3.1%', icon: ShoppingBag, color: 'orange', changeColor: 'text-red-500' },
    { label: 'Satisfacción', value: '4.8', change: '↑ 0.3', icon: Star, color: 'purple', changeColor: 'text-green-500' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'analiticas', label: 'Analíticas', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ];

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
    } else {
      const newUser = {
        ...formData,
        id: Math.max(...users.map(u => u.id), 0) + 1
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Usuario', status: 'Activo' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowUserModal(true);
  };

  const handleDeleteUser = (id) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'Completado': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Procesando': 'bg-blue-100 text-blue-800',
      'Activo': 'bg-green-100 text-green-800',
      'Inactivo': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 font-semibold ${stat.changeColor}`}>{stat.change}</p>
          </div>
          <div className={`p-4 rounded-full ${colorClasses[stat.color]}`}>
            <Icon size={32} />
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-indigo-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const UsersView = () => (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', role: 'Usuario', status: 'Activo' });
            setShowUserModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar usuarios por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analíticas</h1>
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <BarChart3 size={64} className="mx-auto text-indigo-600 mb-4" />
        <p className="text-xl text-gray-600">Vista de analíticas en desarrollo</p>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Configuración</h1>
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Settings size={64} className="mx-auto text-indigo-600 mb-4" />
        <p className="text-xl text-gray-600">Panel de configuración en desarrollo</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DashPro
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <img src="https://i.pravatar.cc/40" alt="User" className="w-10 h-10 rounded-full ring-2 ring-indigo-500" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out
          lg:shadow-lg mt-16 lg:mt-0
        `}>
          <nav className="mt-8 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="ml-3 font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'usuarios' && <UsersView />}
          {activeView === 'analiticas' && <AnalyticsView />}
          {activeView === 'configuracion' && <SettingsView />}
        </main>
      </div>

      {/* Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmitUser} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>Usuario</option>
                  <option>Admin</option>
                  <option>Moderador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                    setFormData({ name: '', email: '', role: 'Usuario', status: 'Activo' });
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProApp;