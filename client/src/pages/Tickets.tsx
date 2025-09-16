
import { useState } from 'react';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  helpfulNotes?: string;
  relatedSkills: string[];
  createdAt: string;
  updatedAt: string;
}

const Tickets = () => {
  // Dummy data based on ticket model schema
  const [tickets] = useState<Ticket[]>([
    {
      _id: '1',
      title: 'Login page not responsive on mobile',
      description: 'The login form breaks on smaller screen sizes and buttons are not clickable.',
      status: 'open',
      createdBy: {
        _id: 'user1',
        name: 'John Doe',
        email: 'john@example.com'
      },
      priority: 'high',
      deadline: '2024-01-25',
      helpfulNotes: 'Check CSS media queries and button z-index',
      relatedSkills: ['CSS', 'Responsive Design', 'Frontend'],
      createdAt: '2024-01-18T10:30:00Z',
      updatedAt: '2024-01-18T10:30:00Z'
    },
    {
      _id: '2',
      title: 'Database connection timeout',
      description: 'Users experiencing slow response times and occasional timeout errors when accessing data.',
      status: 'in-progress',
      createdBy: {
        _id: 'user2',
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      assignedTo: {
        _id: 'dev1',
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      priority: 'urgent',
      deadline: '2024-01-20',
      helpfulNotes: 'Check connection pool settings and query optimization',
      relatedSkills: ['Database', 'Backend', 'Performance'],
      createdAt: '2024-01-17T14:20:00Z',
      updatedAt: '2024-01-18T09:15:00Z'
    },
    {
      _id: '3',
      title: 'Add dark mode toggle',
      description: 'Users have requested a dark mode option for better viewing experience during night time.',
      status: 'open',
      createdBy: {
        _id: 'user3',
        name: 'Mike Wilson',
        email: 'mike@example.com'
      },
      priority: 'medium',
      deadline: '2024-02-01',
      relatedSkills: ['CSS', 'JavaScript', 'UI/UX'],
      createdAt: '2024-01-16T11:45:00Z',
      updatedAt: '2024-01-16T11:45:00Z'
    },
    {
      _id: '4',
      title: 'Email notifications not working',
      description: 'Users are not receiving password reset emails and notification emails.',
      status: 'closed',
      createdBy: {
        _id: 'user4',
        name: 'Sarah Davis',
        email: 'sarah@example.com'
      },
      assignedTo: {
        _id: 'dev2',
        name: 'Bob Brown',
        email: 'bob@example.com'
      },
      priority: 'high',
      deadline: '2024-01-15',
      helpfulNotes: 'Fixed SMTP configuration and email templates',
      relatedSkills: ['Backend', 'Email Services', 'Configuration'],
      createdAt: '2024-01-10T08:30:00Z',
      updatedAt: '2024-01-15T16:20:00Z'
    },
    {
      _id: '5',
      title: 'Improve search functionality',
      description: 'Search results are not accurate and take too long to load. Need better filtering options.',
      status: 'open',
      createdBy: {
        _id: 'user5',
        name: 'Chris Lee',
        email: 'chris@example.com'
      },
      priority: 'low',
      relatedSkills: ['Search', 'Database', 'Frontend'],
      createdAt: '2024-01-12T13:25:00Z',
      updatedAt: '2024-01-12T13:25:00Z'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'open': 'badge-error',
      'in-progress': 'badge-warning',
      'closed': 'badge-success'
    };
    return `badge ${statusClasses[status as keyof typeof statusClasses] || 'badge-neutral'}`;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      'low': 'badge-info',
      'medium': 'badge-warning',
      'high': 'badge-error',
      'urgent': 'badge-error badge-outline'
    };
    return `badge ${priorityClasses[priority as keyof typeof priorityClasses] || 'badge-neutral'}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">Support Tickets</h1>
              <p className="text-base-content/70 mt-1">Manage and track all support requests</p>
            </div>
            <button className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-lg shadow-sm">
            <div className="stat-title">Total Tickets</div>
            <div className="stat-value text-primary">{tickets.length}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow-sm">
            <div className="stat-title">Open</div>
            <div className="stat-value text-error">{tickets.filter(t => t.status === 'open').length}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow-sm">
            <div className="stat-title">In Progress</div>
            <div className="stat-value text-warning">{tickets.filter(t => t.status === 'in-progress').length}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow-sm">
            <div className="stat-title">Closed</div>
            <div className="stat-value text-success">{tickets.filter(t => t.status === 'closed').length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-base-100 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="form-control">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Filter by Status</option>
                <option>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="form-control">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Filter by Priority</option>
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <input type="text" placeholder="Search tickets..." className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-base-content hover:text-primary cursor-pointer">
                        {ticket.title}
                      </h3>
                      <span className={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </span>
                      <span className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-base-content/70 mb-3">{ticket.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ticket.relatedSkills.map((skill, index) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
                      <span>Created by: <strong>{ticket.createdBy.name}</strong></span>
                      {ticket.assignedTo && (
                        <span>Assigned to: <strong>{ticket.assignedTo.name}</strong></span>
                      )}
                      <span>Created: {formatDate(ticket.createdAt)}</span>
                      {ticket.deadline && (
                        <span>Deadline: <strong className="text-warning">{formatDate(ticket.deadline)}</strong></span>
                      )}
                    </div>

                    {/* Helpful Notes */}
                    {ticket.helpfulNotes && (
                      <div className="mt-3 p-3 bg-base-200 rounded-md">
                        <p className="text-sm text-base-content/80">
                          <strong>Notes:</strong> {ticket.helpfulNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border">
                      <li><a>View Details</a></li>
                      <li><a>Edit Ticket</a></li>
                      <li><a>Change Status</a></li>
                      <li><a>Assign User</a></li>
                      <li><a className="text-error">Delete</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
            <p className="text-base-content/60 mb-4">Create your first support ticket to get started.</p>
            <button className="btn btn-primary">Create New Ticket</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
