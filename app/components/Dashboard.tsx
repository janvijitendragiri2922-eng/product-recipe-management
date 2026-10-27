"use client";
import { useAppContext } from "../context/AppContext";
type DashboardProps = {
  onPageChange: (page: "product" | "recipe") => void;
};

export default function Dashboard({
  onPageChange,
}: DashboardProps) {
  
  const {username} = useAppContext();
  return (
    <div className="dashboard-container">
       <h2>Welcome, {username}</h2>
      <h1>Dashboard  ─── ⋆⋅☆⋅⋆ ──  </h1>
      
      <br/>
     
      <center className="dashboard-subtitle">
       <b> Welcome to  Management System</b></center>
       
      

      <div className="dashboard-cards">
        {/* Product Card */}
        <div className="dashboard-card">
          <div className="card-icon product-icon">
                     📦
          </div>

          <h2>Product Management</h2>

          <p>
            Manage your products, add new products,
            update details and delete products.
          </p>

          <button
            className="product-button"
            onClick={() => onPageChange("product")}
          >
            Open Products →
          </button>
        </div>

        {/* Recipe Card */}
        <div className="dashboard-card">
          <div className="card-icon recipe-icon">
            🍳
          </div>

          <h2>Recipe Management</h2>

          <p>
            Manage your recipes, add new recipes,
            update details and delete recipes.
          </p>

          <button
            className="recipe-button"
            onClick={() => onPageChange("recipe")}
          >
            Open Recipes →
          </button>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
        
          padding: 30px;
          min-height: 100vh;
          background: #f5f7fb;
          color: #172554;
           border: 3px solid black;
             box-sizing: border-box;
  border-radius: 20px;
        }
          .dashboard-container:hover{
            background-color: rgb(180, 236, 217);
            }

        h1 {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 700;
        }

        .dashboard-subtitle {
          margin-bottom: 30px;
          color: #64748b;
          font-size: 15px;
        }

        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          max-width: 1000px;
        }
           
        .dashboard-card {
          background: white;
          padding: 28px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
            border: 3px solid black;
             box-sizing: border-box;
  border-radius: 20px;
        }
        

        .dashboard-card:hover {
       
           background-color: #a2dcec;

          transform: translateY(-4px);
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.1);
        }

        .card-icon {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          border-radius: 12px;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .product-icon {
          background: #dbeafe;
        }

        .recipe-icon {
          background: #ccfbf1;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 12px;
        }

        .dashboard-card p {
          color: #64748b;
          line-height: 1.7;
          font-size: 14px;
          min-height: 48px;
        }

        button {
          width: 100%;
          padding: 12px 16px;
          margin-top: 14px;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        button:hover {
          opacity: 0.88;
        }

        .product-button {
          background: #2563eb;
        }

        .recipe-button {
          background: #0f766e;
        }

      
      `}</style>
    </div>
  );
}


