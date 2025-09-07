import FusePageCardedHeader from '@fuse/core/FusePageCarded/FusePageCardedHeader';
import Typography from '@mui/material/Typography';

function UserProfileHeader() {
	return (
		<FusePageCardedHeader
			header={
				<div className="flex flex-col gap-2 p-4 pb-0 md:px-8 md:pb-0">
					<div>
						<Typography
							variant="h3"
							component="h1"
							className="text-3xl font-semibold tracking-tight md:text-4xl"
							sx={{ lineHeight: 1.2 }}
						>
							Profile
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							className="mt-1 font-medium tracking-tight"
							sx={{ maxWidth: 480 }}
						>
							Manage your profile and private information
						</Typography>
					</div>
				</div>
			}
		/>
	);
}

export default UserProfileHeader;
