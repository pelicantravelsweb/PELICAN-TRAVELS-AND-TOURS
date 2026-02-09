"use client";
import React, { useState, useEffect } from "react";
import styles from "./admin.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import AddPackage from "./components/AddPackage";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [packages, setPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const router = useRouter();

  const fetchPackages = async () => {
    setPackagesLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "packages"));
      const packagesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Package data from Firestore:", data);
        return {
          id: doc.id,
          ...data,
          // Ensure duration values are numbers, not objects
          duration: {
            days: typeof data.duration?.days === 'number' ? data.duration.days : 0,
            nights: typeof data.duration?.nights === 'number' ? data.duration.nights : 0
          },
          pax: {
            min: typeof data.pax?.min === 'number' ? data.pax.min : 0,
            max: typeof data.pax?.max === 'number' ? data.pax.max : 0
          },
          price: typeof data.price === 'number' ? data.price : 0
        };
      });
      setPackages(packagesData);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setPackagesLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const inquiriesData = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || new Date()
      }));
      setInquiries(inquiriesData);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPackages();
        fetchInquiries();
      } else {
        router.push("/admin-login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleDeletePackage = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await deleteDoc(doc(db, "packages", packageId));
        setPackages(packages.filter(p => p.id !== packageId));
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Error deleting package. Please try again.");
      }
    }
  };

  const handlePackageCreated = () => {
    fetchPackages();
    setShowAddPackage(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin-login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.preloader}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>PELICAN TOURS</h1>
          <p>Admin Panel</p>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeTab === "dashboard" ? styles.active : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fa fa-home"></i>
            <span>Dashboard</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "packages" ? styles.active : ""}`}
            onClick={() => setActiveTab("packages")}
          >
            <i className="fa fa-suitcase"></i>
            <span>Tour Packages</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "inquiries" ? styles.active : ""}`}
            onClick={() => setActiveTab("inquiries")}
          >
            <i className="fa fa-envelope"></i>
            <span>Inquiries</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "destinations" ? styles.active : ""}`}
            onClick={() => setActiveTab("destinations")}
          >
            <i className="fa fa-map-marker"></i>
            <span>Destinations</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fa fa-cog"></i>
            <span>Settings</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backToSite}>
            <i className="fa fa-external-link"></i>
            <span>View Website</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fa fa-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2 className={styles.pageTitle}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className={styles.userInfo}>
            <span>{user.email}</span>
            <i className="fa fa-user-circle"></i>
          </div>
        </header>

        <div className={styles.content}>
          {activeTab === "dashboard" && (
            <div className={styles.dashboardGrid}>
              <div className={styles.statCard}>
                <i className="fa fa-suitcase"></i>
                <div className={styles.statInfo}>
                  <h3>{packages.length}</h3>
                  <p>Tour Packages</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <i className="fa fa-envelope"></i>
                <div className={styles.statInfo}>
                  <h3>{inquiries.filter(inq => inq.status === 'new').length}</h3>
                  <p>New Inquiries</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <i className="fa fa-map-marker"></i>
                <div className={styles.statInfo}>
                  <h3>0</h3>
                  <p>Destinations</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <i className="fa fa-users"></i>
                <div className={styles.statInfo}>
                  <h3>0</h3>
                  <p>Total Visitors</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "packages" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Manage Tour Packages</h3>
                <button className={styles.addBtn} onClick={() => setShowAddPackage(true)}>
                  <i className="fa fa-plus"></i> Add Package
                </button>
              </div>

              {packagesLoading ? (
                <div className={styles.loadingState}>
                  <i className="fa fa-spinner fa-spin"></i>
                  <p>Loading packages...</p>
                </div>
              ) : packages.length === 0 ? (
                <div className={styles.emptyState}>
                  <i className="fa fa-suitcase"></i>
                  <p>No tour packages found. Click "Add Package" to create one.</p>
                </div>
              ) : (
                <div className={styles.packagesList}>
                  {packages.map((pkg) => {
                    // Safely extract values, ensuring they're not objects
                    const safeTitle = typeof pkg.title === 'string' ? pkg.title : 'Untitled';
                    const safeDays = typeof pkg.duration?.days === 'number' ? pkg.duration.days : 0;
                    const safeNights = typeof pkg.duration?.nights === 'number' ? pkg.duration.nights : 0;
                    const safeMinPax = typeof pkg.pax?.min === 'number' ? pkg.pax.min : 0;
                    const safeMaxPax = typeof pkg.pax?.max === 'number' ? pkg.pax.max : 0;
                    const safeCurrency = typeof pkg.currency === 'string' ? pkg.currency : 'USD';
                    const safePrice = typeof pkg.price === 'number' ? pkg.price : 0;
                    const safeTourType = typeof pkg.tourType === 'string' ? pkg.tourType : 'Tour';
                    const safeCoverImage = typeof pkg.coverImage === 'string' ? pkg.coverImage : '';

                    return (
                      <div key={pkg.id} className={styles.packageCard}>
                        <div className={styles.packageImage}>
                          {safeCoverImage ? (
                            <img src={safeCoverImage} alt={safeTitle} />
                          ) : (
                            <div className={styles.noImage}>
                              <i className="fa fa-image"></i>
                            </div>
                          )}
                        </div>
                        <div className={styles.packageInfo}>
                          <h4>{safeTitle}</h4>
                          <div className={styles.packageMeta}>
                            <span><i className="fa fa-clock"></i> {safeDays} Days / {safeNights} Nights</span>
                            <span><i className="fa fa-users"></i> {safeMinPax}-{safeMaxPax} Pax</span>
                            <span><i className="fa fa-tag"></i> {safeCurrency} {safePrice}</span>
                          </div>
                          <p className={styles.packageType}>{safeTourType}</p>
                        </div>
                        <div className={styles.packageActions}>
                          <button className={styles.editBtn} title="Edit" onClick={() => setEditingPackage(pkg)}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className={styles.deleteBtn}
                            title="Delete"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Customer Inquiries ({inquiries.length})</h3>
              </div>

              {inquiriesLoading ? (
                <div className={styles.loadingState}>
                  <i className="fa fa-spinner fa-spin"></i>
                  <p>Loading inquiries...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className={styles.emptyState}>
                  <i className="fa fa-envelope"></i>
                  <p>No inquiries yet.</p>
                </div>
              ) : (
                <>
                  {selectedInquiry && (
                    <div className={styles.inquiryDetailOverlay} onClick={() => setSelectedInquiry(null)}>
                      <div className={styles.inquiryDetailModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.inquiryDetailHeader}>
                          <h3>Inquiry Details</h3>
                          <button onClick={() => setSelectedInquiry(null)} className={styles.closeInquiryBtn}>
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                        <div className={styles.inquiryDetailBody}>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Name:</strong> <span>{selectedInquiry.name}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Email:</strong> <span>{selectedInquiry.email}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Mobile:</strong> <span>{selectedInquiry.mobile}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>PAX:</strong> <span>{selectedInquiry.pax}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Days:</strong> <span>{selectedInquiry.days}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Source:</strong> <span>{selectedInquiry.source}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Date:</strong> <span>{selectedInquiry.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div className={styles.inquiryDetailRow}>
                            <strong>Message:</strong>
                            <p>{selectedInquiry.message || 'No message provided.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.inquiryList}>
                    {inquiries.map(inq => (
                      <div
                        key={inq.id}
                        className={`${styles.inquiryCard} ${inq.status === 'new' ? styles.inquiryNew : ''}`}
                        onClick={() => setSelectedInquiry(inq)}
                      >
                        <div className={styles.inquiryInfo}>
                          <h4>{inq.name}</h4>
                          <p className={styles.inquiryEmail}>{inq.email}</p>
                          <p className={styles.inquiryPreview}>
                            {inq.message ? inq.message.substring(0, 80) + (inq.message.length > 80 ? '...' : '') : 'No message'}
                          </p>
                        </div>
                        <div className={styles.inquiryMeta}>
                          <span className={`${styles.inquiryStatus} ${styles[`status_${inq.status}`]}`}>
                            {inq.status}
                          </span>
                          <span className={styles.inquiryDate}>
                            {inq.createdAt.toLocaleDateString()}
                          </span>
                          <span className={styles.inquirySource}>
                            <i className="fa fa-tag"></i> {inq.source}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "destinations" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Manage Destinations</h3>
                <button className={styles.addBtn}>
                  <i className="fa fa-plus"></i> Add Destination
                </button>
              </div>
              <div className={styles.emptyState}>
                <i className="fa fa-map-marker"></i>
                <p>No destinations found. Click "Add Destination" to create one.</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Account Settings</h3>
              </div>
              <div className={styles.settingsForm}>
                <div className={styles.settingItem}>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles.settingItem}>
                  <label>Last Sign In</label>
                  <p>{user.metadata?.lastSignInTime || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Package Modal */}
      {(showAddPackage || editingPackage) && (
        <AddPackage
          editPackage={editingPackage}
          onClose={() => {
            setShowAddPackage(false);
            setEditingPackage(null);
          }}
          onSuccess={() => {
            fetchPackages();
            setShowAddPackage(false);
            setEditingPackage(null);
          }}
        />
      )}
    </div>
  );
}
